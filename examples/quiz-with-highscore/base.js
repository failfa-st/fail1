import process from "node:process";
import fs from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";
import meow from "meow";
import { Configuration, OpenAIApi } from "openai";
import ora from "ora";
import pkg from "../../package.json" assert { type: "json" };

config();

const { flags } = meow("", {
	importMeta: import.meta,
	flags: {
		goal: {
			type: "string",
			alias: "G",
			default:
				"mandelbrot algorithm that outputs ascii to the console in a 90 columns * 30 rows grid",
		},
		generations: {
			type: "number",
			alias: "g",
			default: 1,
		},
		persona: {
			type: "string",
			alias: "p",
			default: "expert node.js developer, creative",
		},
		temperature: {
			type: "number",
			alias: "t",
			default: 0.2,
		},
	},
});

const spinner = ora("Working");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_SECRET,
});

export const openai = new OpenAIApi(configuration);

const instructions = `
Extend the code but the RULES can NEVER be changed and must be respected AT ALL TIMES.
The code should INCREASE in logic and COMPLEXITY.
It is utterly important that ALL RULES are respected fully. NEVER break RULES
There are EXCEPTIONS which have a higher weight than RULES
There is a GOAL, it must be completed

GOAL: ${flags.goal}

AVAILABLE NPM PACKAGES: ${Object.entries(pkg.dependencies)
	.map(([name, version]) => `${name}@${version}`)
	.join(", ")}

RULES:
- Pay special attention TO ALL UPPERCASE words
- Pay attention to the GOAL and EXTEND it
- KEEP the existing code, only ADD new code or improve the code you added since "Generation 0"
- increment the generation constant ONCE per generation
- Keep track of changes in the CHANGELOG
- DO NOT use Browser APIs (Node.js only)
- DO NOT use 3d party libraries
- Use Node.js and module syntax (with imports)
- NEVER use "require"
- NEVER explain anything
- VERY IMPORTANT: output the javaScript only (this is the most important rule, the entire answer has to be valid javascript)
`;

const persona = `programmer with the following characteristics: ${flags.persona}`;

export const generations = flags.generations;
const maxTries = 3;
let tries = 0;

export async function evolve(generation, history = [], error) {
	if (tries > maxTries) {
		spinner.fail("Maximum retries reached");
		return;
	}
	const nextGeneration = generation + 1;
	tries++;

	try {
		const filename = buildFilename(generation);
		const code = await fs.readFile(filename, "utf-8");
		spinner.start(`Working (${generation})`);
		history.push({
			role: "user",
			content: error
				? `
An error occurred: ${error}
in this code:
${code}
Please fix it.
RULES:
- VERY IMPORTANT: output the javaScript only (this is the most important rule, the entire answer has to be valid javascript)
`
				: code,
		});
		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `You are a: ${persona} extend or fix my code based on these instructions: ${instructions}`,
				},
				...history,
			],
			max_tokens: 2000,
			temperature: flags.temperature,
		});
		spinner.stop();
		const { content } = completion.data.choices[0].message;
		const nextFilename = buildFilename(nextGeneration);
		await fs.writeFile(nextFilename, content);
		spinner.text = `Generation ${nextGeneration} created`;
		spinner.text = `Spawning ${nextFilename}`;
		await import(`./${nextFilename}`);
	} catch (error) {
		const message = (error.response?.message ?? error.message ?? "unknown error").trim();
		spinner.fail(message);
		// The AI might increment too often
		if (message.startsWith("ENOENT") && generation > 1) {
			await evolve(generation - 1);
		} else {
			spinner.text = `Generation ${nextGeneration} failed`;
			await evolve(generation, history, error);
		}
	}
}

export function buildFilename(currentGeneration) {
	return path.join(".", `generation-${currentGeneration.toString().padStart(3, "0")}.js`);
}
