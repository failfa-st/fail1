import process from "node:process";
import fs from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";
import meow from "meow";
import { Configuration, OpenAIApi } from "openai";
import ora from "ora";
import pkg from "./package.json" assert { type: "json" };

config();

const { flags } = meow("", {
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
			default: "expert node.js developer, creative, interaction expert, cli expert",
		},
		temperature: {
			type: "number",
			alias: "t",
			default: 0.2,
		},
	},
});

const spinner = ora("Evolving");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_SECRET,
});

export const openai = new OpenAIApi(configuration);

const instructions = `
Extend the code but the RULES can NEVER be changed and must be respected AT ALL TIMES.
The code should INCREASE in logic.
The GOAL must be completed.

GOAL: ${flags.goal}

ALLOWED NPM PACKAGES: ${Object.entries(pkg.dependencies)
	.map(([name, version]) => `${name}@${version}`)
	.join(", ")}

RULES:
- Pay special attention TO ALL UPPERCASE words
- KEEP the existing code, only ADD new code or improve the code you added since "Generation 0"
- increment the generation constant ONCE per generation
- Keep track of changes, EXTEND the CHANGELOG
- Use es module syntax (with imports)
- NEVER use "require"
- NEVER explain anything
- VERY IMPORTANT: output the javaScript only (this is the most important rule, the entire answer has to be valid javascript)
`;

const persona = `programmer with the following characteristics: ${flags.persona}`;

export const generations = flags.generations;
const maxSpawns = 3;
let spawns = maxSpawns;

export async function evolve(generation) {
	if (spawns <= 0) {
		spinner.fail("Maximum retries reached");
		return;
	}
	const nextGeneration = generation + 1;

	try {
		const filename = buildFilename(generation);
		const code = await fs.readFile(filename, "utf-8");
		spinner.start(`Generation ${generation} | ${spawns} spawns left`);

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `You are a: ${persona} extend or fix my code based on these instructions: ${instructions}`,
				},
				{
					role: "user",
					content: code,
				},
			],
			max_tokens: 2048,
			temperature: flags.temperature,
		});
		spinner.stop();
		const { content } = completion.data.choices[0].message;
		const nextFilename = buildFilename(nextGeneration);
		await fs.writeFile(nextFilename, content);
		spinner.succeed(`Generation ${generation} | ${spawns} spawns left`);
		await import(`./${nextFilename}`);
	} catch (error) {
		spawns--;
		spinner.fail(`Generation ${generation} | ${spawns} spawns left`);

		await handleError(error, generation);
	}
}

export function pad(n) {
	return n.toString().padStart(3, "0");
}

export function buildFilename(currentGeneration) {
	return path.join(".", `generation-${pad(currentGeneration)}.js`);
}

export async function handleError(error, generation) {
	const message = (
		error.response?.data?.error.message ??
		error.message ??
		"unknown error"
	).trim();

	const code = error.response?.status ?? error.code ?? -1;

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
			return;
		}

		return;
	}

	console.error(error);
	throw error;
}
