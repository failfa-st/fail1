import fs from "node:fs/promises";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_SECRET,
});

export const openai = new OpenAIApi(configuration);

export function instructions(code) {
	return `
Extend the code but the RULES can NEVER be changed and must be respected AT ALL TIMES.
It is utterly important that ALL RULES are respected fully. NEVER break RULES
There are EXCEPTIONS which have a higher weight than RULES
There is a GOAL, it must be completed

RULES:
- Pay special attention TO ALL UPPERCASE words
- Pay attention to the GOAL
- KEEP the existing code, only ADD new code or IMPROVE the code you added since "Generation 0"
- NEVER delete comments from the code
- NEVER adjust the generation constant
- Keep track of changes in the CHANGELOG
- No user input is required
- Use Node.js and module syntax (with imports)
- VERY IMPORTANT: DO NOT import any new modules or packages
- VERY IMPORTANT: output the javaScript only (this is the most important rule, the entire answer has to be valid javascript)

CODE: ${code}`;
}

export const generations = 5;
const maxTries = 3;
let tries = 0;

export async function evolve(generation) {
	if (tries >= maxTries) {
		return;
	}
	const nextGeneration = generation + 1;
	tries++;
	try {
		const filename = buildFilename(generation);
		const code = (await fs.readFile(filename, "utf-8")).replace(
			/generation + \d+/,
			`generation = ${generation + 1}`
		);

		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: instructions(code),
				},
			],
			max_tokens: 2000,
		});
		const { content } = completion.data.choices[0].message;
		const nextFilename = buildFilename(nextGeneration);
		await fs.writeFile(nextFilename, content);
		console.log(`Generation ${nextGeneration} created`);
		console.log(`Spawning ${nextFilename}`);
		await import(`./${nextFilename}`);
	} catch (error) {
		console.error(`Error: ${error.response?.message ?? error.message ?? "unknown error"}`);
		console.log(`Generation ${nextGeneration} died`);
		await evolve(generation);
	}
}

export function buildFilename(currentGeneration) {
	return `generation-${currentGeneration.toString().padStart(3, "0")}.js`;
}
