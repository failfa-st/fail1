import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
import fs from "node:fs/promises";
config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_SECRET,
});

export const openai = new OpenAIApi(configuration);

export function createMessage(code) {
	return `
Extend the code but the RULES can NEVER be changed and must be respected AT ALL TIMES.
It is utterly important that ALL RULES are respected fully. NEVER break RULES
There are EXCEPTIONS which have a higher weight than RULES
There is a GOAL, it must be completed


RULES:
- Pay special attention TO ALL UPPERCASE words
- Pay attention to the GOAL
- KEEP the existing code, only ADD new code or IMPROVE the code you added since "Generation 0" (important to KEEP EVOLVING)
- DO NOT import any new modules or packages
- NEVER delete comments from the code
- Keep track of changes in the CHANGELOG
- Use Node.js and module syntax (with imports)
- No user input is required
- Very Important: output the javaScript only (this is the most important rule, the entire answer has to be valid javascript)

CODE: ${code}`;
}

export const generations = 5;

export async function evolve(code, nextGeneration) {
	try {
		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: createMessage(code),
				},
			],
			max_tokens: 2000,
		});
		const { content } = completion.data.choices[0].message;
		const nextFilename = buildFilename(nextGeneration);
		await fs.writeFile(nextFilename, content);
		console.log(`Generation ${nextGeneration} created`);
		await import(`./${nextFilename}`);
	} catch (error) {
		console.log(error);
	}
}

export function buildFilename(currentGeneration) {
	return `generation-${currentGeneration.toString().padStart(3, "0")}.js`;
}
