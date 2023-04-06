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
The code should ALWAYS be IMPROVED or EXTENDED or REFACTORED or FIXED
be creative and add new features
The GOAL must be completed

GOAL: ${flags.goal}

increment the generation constant ONCE per generation
Keep track of changes, EXTEND the CHANGELOG
NEVER use external apis with secret or key
ONLY use es module syntax (with imports)
NEVER explain anything
ALWAYS output ONLY JavaScript
`;

const history = [];

export const generations = flags.generations;
const maxSpawns = 3;
let spawns = maxSpawns;
let run = 0;

export async function evolve(generation) {
	if (flags.help) {
		return;
	}
	if (spawns <= 0) {
		spinner.fail("Maximum retries reached");
		return;
	}
	const nextGeneration = generation + 1;

	try {
		const filename = buildFilename(generation);
		const code = await fs.readFile(filename, "utf-8");
		spinner.start(`Generation ${generation} | ${spawns} spawns left`);

		if (flags.clean) {
			// Remove all older generations
			const files = (await globby(["generation-*.js", "!generation-000.js"])).filter(
				file => file > buildFilename(generation)
			);
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
		spinner.start(`Evolution ${generation} -> ${generation + 1}`);
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
		spinner.stop();
		const { content } = completion.data.choices[0].message;
		const cleanContent = content
			.replace("```javascript", "")
			.replace("```js", "")
			.replace("```", "");
		if (cleanContent.startsWith("/*")) {
			history.push({
				role: "assistant",
				content: cleanContent,
			});
			const nextFilename = buildFilename(nextGeneration);
			await fs.writeFile(nextFilename, prettify(cleanContent));
			spinner.succeed(`Evolution ${generation} -> ${generation + 1}`);
			await import(`./${nextFilename}`);
		} else {
			throw new Error("NOT_JAVASCRIPT");
		}
	} catch (error) {
		spawns--;
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

export function minify(code) {
	return code.replace(/^\s+/gim, "");
}

export function prettify(code) {
	return prettier.format(code, { semi: false, parser: "babel" });
}

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
