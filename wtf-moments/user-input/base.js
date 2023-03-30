import fs from "node:fs/promises";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

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

RULES:
- Pay special attention TO ALL UPPERCASE words
- Pay attention to the GOAL
- KEEP the existing code, only ADD new code or IMPROVE the code you added since "Generation 0"
- NEVER delete comments from the code
- increment the generation constant ONCE per generation
- Keep track of changes in the CHANGELOG
- No user input is required
- DO NOT use Browser APIs (Node.js only)
- DO NOT use 3d party libraries
- Use Node.js and module syntax (with imports)
- NEVER use "require"
- VERY IMPORTANT: DO NOT import any new modules or packages
- VERY IMPORTANT: output the javaScript only (this is the most important rule, the entire answer has to be valid javascript)
`;

export const generations = 5;
const maxTries = 3;
let tries = 0;

export async function evolve(generation) {
	if (tries > maxTries) {
		return;
	}
	const nextGeneration = generation + 1;
	tries++;
	try {
		const filename = buildFilename(generation);
		const code = await fs.readFile(filename, "utf-8");

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `You are a creative expert programmer that extends code based on these instructions: ${instructions}`,
				},
				{
					role: "user",
					content: code,
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
		const message = (error.response?.message ?? error.message ?? "unknown error").trim();
		console.error(`Error: ${message}`);
		// The AI might increment too often
		if (message.startsWith("ENOENT") && generation > 1) {
			await evolve(generation - 1);
		} else {
			console.log(`Generation ${nextGeneration} failed`);
			await evolve(generation);
		}
	}
}

export function buildFilename(currentGeneration) {
	return `generation-${currentGeneration.toString().padStart(3, "0")}.js`;
}