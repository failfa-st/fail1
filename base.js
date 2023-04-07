import process from "node:process";
import fs from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";
import meow from "meow";
import { Configuration, OpenAIApi } from "openai";
import ora from "ora";
import { globby } from "globby";
import prettier from "prettier";

config();

const { flags } = meow(
	`
Usage
  $ node <start generation>

Options
  -G, --goal           Set the goal of the generated code. Default is "extend the code".
  -g, --generations    Set the number of generations for the generated code. Default is 1.
  -p, --persona        Set the persona of the generated code. Default is "expert node.js developer, creative, code optimizer, interaction expert".
  -t, --temperature    Set the temperature for the generated code. Default is 0.2.
  -c, --clean          Set to true if you want to remove any previously generated code.
  -m, --model          Set the model to use for generating the code. Default is "gpt-3.5-turbo".

Examples
  $ node generation-000.js -G "console based mandelbrot set ascii" -g 3 -p "Node.js developer, creative" -c

`,
	{
		importMeta: import.meta,
		flags: {
			goal: {
				type: "string",
				alias: "G",
				default: "extend the code",
			},
			generations: {
				type: "number",
				alias: "g",
				default: 1,
			},
			persona: {
				type: "string",
				alias: "p",
				default: "expert node.js developer, creative, code optimizer, interaction expert",
			},
			neg: {
				type: "string",
				alias: "n",
			},
			temperature: {
				type: "number",
				alias: "t",
				default: 0.2,
			},
			clean: {
				type: "boolean",
				alias: "c",
				default: false,
			},
			model: {
				type: "string",
				alias: "m",
				default: "gpt-3.5-turbo",
			},
		},
	}
);

const spinner = ora("Evolving");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

const instructions = `
GOAL: ${flags.goal}${
	flags.neg
		? `, ${flags.neg
				.split(",")
				.map(neg => `no ${neg.trim()}`)
				.join(", ")}`
		: ""
}

RULES:
The code should ALWAYS be EXTENDED or REFACTORED or FIXED
The GOAL must be completed
increment the generation constant ONCE per generation
EXTEND the CHANGELOG
NEVER use external apis with secret or key
EXCLUSIVELY use esm (imports)
NEVER explain anything
NEVER output markdown
EXCLUSIVELY output JavaScript
EVERYTHING happens in one file
VERY IMPORTANT: the entire answer has to be valid JavaScript
`;

const history = [];

export const generations = flags.generations;
let run = 0;

/**
 *
 * @param {number} generation
 * @returns {Promise<void>}
 */
export async function evolve(generation) {
	if (flags.help) {
		return;
	}

	const nextGeneration = generation + 1;
	spinner.start(`Evolution ${generation} -> ${nextGeneration}`);

	try {
		const filename = buildFilename(generation);
		const code = await fs.readFile(filename, "utf-8");

		// Reduce history length
		history.shift();
		history.shift();

		if (flags.clean) {
			// Remove all older generations
			const files = (
				await globby(["generation-*.js", "generation-*.md", "!generation-000.js"])
			).filter(file => file > buildFilename(generation));
			await Promise.all(files.map(async file => await fs.unlink(file)));
		}

		if (run === 0) {
			const promptFilename = buildPromptFilename(generation);
			await fs.writeFile(promptFilename, buildPrompt(flags.goal, flags.neg));

			history.push(
				{
					role: "user",
					content: generation === 0 ? "build the initial code" : "continue the code",
				},
				{
					role: "assistant",
					content: minify(code),
				}
			);
		}

		run++;

		history.push({
			role: "user",
			content: "continue the code",
		});

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: flags.model,
			messages: [
				{
					role: "system",
					content: `You are a: ${flags.persona}. You strictly follow these instructions: ${instructions}`,
				},
				...history,
			],
			max_tokens: 2048,
			temperature: flags.temperature,
		});

		const { content } = completion.data.choices[0].message;

		// Clean GPT output (might return  code block)
		const cleanContent = minify(content)
			.replace("```javascript", "")
			.replace("```js", "")
			.replace("```", "")
			.trim();

		// Code should start with a comment (changelog). If it doesn't it is often not JavaScrip but
		// a human language response
		if (cleanContent.startsWith("/*")) {
			history.push({
				role: "assistant",
				content: cleanContent,
			});

			const nextFilename = buildFilename(nextGeneration);
			await fs.writeFile(nextFilename, prettify(cleanContent));

			spinner.succeed(`Evolution ${generation} -> ${nextGeneration}`);

			await import(`./${nextFilename}`);
		} else {
			spinner.fail(`Evolution ${generation} -> ${nextGeneration}`);
			await handleError(new Error("NOT_JAVASCRIPT"), generation);
		}
	} catch (error) {
		spinner.fail(`Evolution ${generation} -> ${nextGeneration}`);
		await handleError(error, generation);
	}
}

/**
 * Pads the given number or string with zeros to a length of 3 characters.
 *
 * @param {number} n - The input number or string to be padded.
 * @returns {string} - The padded string.
 */
export function pad(n) {
	return n.toString().padStart(3, "0");
}

/**
 * Builds a filename string for the given generation number.
 *
 * @param {number} currentGeneration - The input generation number.
 * @returns {string} - The generated filename string.
 */
export function buildFilename(currentGeneration) {
	return path.join(".", `generation-${pad(currentGeneration)}.js`);
}

/**
 * Builds a prompt filename string for the given generation number.
 *
 * @param {number} currentGeneration - The input generation number.
 * @returns {string} - The generated prompt filename string.
 */
export function buildPromptFilename(currentGeneration) {
	return path.join(".", `generation-${pad(currentGeneration)}.md`);
}

/**
 * Builds a formatted string combining the given prompt and optional negativePrompt.
 *
 * @param {string} prompt - The main prompt to be included in the output.
 * @param {string} [negativePrompt] - The optional negative prompt to be included in the output.
 * @returns {string} - The formatted string combining the prompts.
 */
export function buildPrompt(prompt, negativePrompt = "") {
	return `# Configuration

## Prompt

\`\`\`shell
${prompt}
\`\`\`

## Negative Prompt

\`\`\`shell
${negativePrompt}
\`\`\`
`;
}

/**
 * Minifies the given code string by removing leading whitespace.
 *
 * @param {string} code - The input code to be minified.
 * @returns {string} - The minified code.
 */
export function minify(code) {
	return code.replace(/^\s+/g, "");
}

/**
 * Prettifies the given code string using Prettier.
 *
 * @param {string} code - The input code to be prettified.
 * @returns {string} - The prettified code.
 */
export function prettify(code) {
	return prettier.format(code, { semi: false, parser: "babel" });
}

/**
 * Handles errors that occur during the code generation process.
 *
 * @param {Error} error - The error object containing information about the error.
 * @param {number} generation - The current generation number.
 * @returns {Promise<void>} - A promise that resolves when the error is handled.
 */
export async function handleError(error, generation) {
	const message = (
		error.response?.data?.error.message ??
		error.message ??
		"unknown error"
	).trim();

	const code = error.response?.status ?? error.code ?? "UNKNOWN_CODE";

	if (code === "ERR_MODULE_NOT_FOUND") {
		console.error(message);
		return;
	}

	// The AI might increment too often
	if (message.startsWith("ENOENT") && generation > 1) {
		await evolve(generation - 1);
	}

	// Errors in the API
	if (error.response && code !== 200) {
		console.error(`${code}: ${message}`);

		if (code === 401) {
			console.error(
				"Please make sure to use a valid API key and that you have set OPENAI_SECRET in .env"
			);
		}

		return;
	}

	if (message === "NOT_JAVASCRIPT") {
		console.error("The API returned a message that is not valid JavaScript");
		return;
	}

	console.error(error);
	throw error;
}
