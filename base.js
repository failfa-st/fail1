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
				default: "gpt-3.5-turbo-0301",
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
Extend the code but the RULES can NEVER be changed and must be respected AT ALL TIMES.
The code should INCREASE in logic.
The GOAL must be completed.

GOAL: ${flags.goal}

RULES:
- Pay special attention TO ALL UPPERCASE words
- KEEP the existing code, only ADD new code or improve the code you added since "Generation 0"
- increment the generation constant ONCE per generation
- Keep track of changes, EXTEND the CHANGELOG
- Use es module syntax (with imports)
- NEVER use "require"
- NEVER explain anything
- VERY IMPORTANT: output valid JavaScript only
`;

const history = [];

export const generations = flags.generations;
let run = 0;

export async function evolve(generation) {
	if (flags.help) {
		return;
	}
	const nextGeneration = generation + 1;

	try {
		const filename = buildFilename(generation);
		const code = await fs.readFile(filename, "utf-8");
		spinner.start(`Evolution ${generation} -> ${generation + 1}`);
		history.shift();
		history.shift();

		if (flags.clean) {
			// Remove all older generations
			const files = (
				await globby(["generation-*.js", "!generation-000.js", "generation-error-*.js"])
			).filter(file => file > buildFilename(generation));
			await Promise.all(files.map(async file => await fs.unlink(file)));
		}

		if (run === 0) {
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

		console.log([
			{
				role: "system",
				content: `You are a programmer with these characteristics: ${flags.persona}. You strictly follow these instructions: ${instructions}`,
			},
			...history,
		]);

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: flags.model,
			messages: [
				{
					role: "system",
					content: `You are a programmer with these characteristics: ${flags.persona}. You strictly follow these instructions: ${instructions}`,
				},
				...history,
			],
			max_tokens: 2048,
			temperature: flags.temperature,
		});
		spinner.stop();
		const { content } = completion.data.choices[0].message;
		const cleanContent = content
			.replace("```javascript", "")
			.replace("```js", "")
			.replace("```", "")
			.replace(/\s+/g, " ");
		if (cleanContent.startsWith("/*")) {
			history.push({
				role: "assistant",
				content: cleanContent,
			});
			const nextFilename = buildFilename(nextGeneration);

			try {
				await fs.writeFile(nextFilename, prettify(cleanContent));
			} catch (error) {
				spinner.fail(`Evolution ${generation} -> ${generation + 1}`);

				const nextFilename = buildErrorFilename(nextGeneration);
				await fs.writeFile(nextFilename, cleanContent);

				return;
			}

			spinner.succeed(`Evolution ${generation} -> ${generation + 1}`);
			await import(`./${nextFilename}`);
		} else {
			throw new Error("NOT_JAVASCRIPT");
		}
	} catch (error) {
		spinner.fail(`Evolution ${generation} -> ${generation + 1}`);
		await handleError(error, generation);
	}
}

export function pad(n) {
	return n.toString().padStart(3, "0");
}

export function buildFilename(currentGeneration) {
	return path.join(".", `generation-${pad(currentGeneration)}.js`);
}

export function buildErrorFilename(currentGeneration) {
	return path.join(".", `generation-error-${pad(currentGeneration)}.js`);
}

export function minify(code) {
	return code.replace(/^\s+/g, "");
}

export function prettify(code) {
	return prettier.format(code, { semi: false, parser: "babel" });
}

export async function handleError(error, generation) {
	const message = (
		error.response?.data?.error?.message ??
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
