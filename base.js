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
		prompt: {
			type: "string",
			alias: "P",
		},
		negativePrompt: {
			type: "string",
			alias: "N",
		},
		generations: {
			type: "number",
			alias: "g",
			default: 1,
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

export const generations = flags.generations;

function parseInput(input) {
	const regex = /\(([^)]+)\):([\d.]+)|(\w+):([\d.]+)|(\w+)/g;
	const output = [];

	let match;

	while (true) {
		match = regex.exec(input);
		if (match === null) {
			break;
		}

		if (match[1]) {
			const tokens = match[1].split(" ");
			const weight = parseFloat(match[2]);
			tokens.forEach(token => {
				output.push({ token, weight });
			});
		} else if (match[3]) {
			const token = match[3];
			const weight = parseFloat(match[4]);
			output.push({ token, weight });
		} else {
			const token = match[5];
			const weight = 1;
			output.push({ token, weight });
		}
	}

	return output;
}

const persona = `expert node.js developer, creative"`;
export async function evolve(generation) {
	const nextGeneration = generation + 1;

	try {
		const filename = buildFilename(generation);
		const code = await fs.readFile(filename, "utf-8");
		spinner.start(`Working (${generation})`);
		const messages = [
			{
				role: "system",
				content: `
You are a: "${persona}", that sends  ONLY valid JavaScript. You get javascript and answer javascript.
- Pay special attention TO ALL UPPERCASE words.
- Extend the code but the RULES can NEVER be changed and must be respected AT ALL TIMES.
- There is a GOAL, it must be completed
- ALWAYS answer with code
- NEVER answer with empty output
---

PROMPT: "${flags.prompt}"
---
${
	flags.negativePrompt
		? `

NEGATIVE PROMPT: "${flags.negativePrompt}"
---`
		: ""
}

AVAILABLE NPM PACKAGES: ${Object.entries(pkg.dependencies)
					.map(([name, version]) => `${name}@${version}`)
					.join(", ")}

RULES:
- Keep track of changes in the CHANGELOG
- Use Node.js and module syntax (with imports)
- NEVER use "require"
- NEVER output an explanation or text
- no surrounding text only JS so it can be parsed
- explanation or text in CODE COMMENTS ONLY
- VERY IMPORTANT: output the JavaScript only (this is the most important rule, the entire answer has to be valid JavaScript)
`,
			},
			{
				role: "user",
				content: code,
			},
		];

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages,
			max_tokens: 2000,
			temperature: flags.temperature,
		});
		console.log(">>>>", JSON.stringify(completion.data, null, 4));
		spinner.stop();
		const { content } = completion.data.choices[0].message;

		if (content === "" || !content.trim().startsWith("/**")) {
			await evolve(generation);
			return;
		}
		const nextFilename = buildFilename(nextGeneration);
		await fs.writeFile(nextFilename, content);
		await import(`./${nextFilename}`);
	} catch (error) {
		const message = (error.response?.message ?? error.message ?? "unknown error").trim();
		console.error(message);
		spinner.fail(message);
	}
}

export function buildFilename(currentGeneration) {
	return path.join(".", `generation-${currentGeneration.toString().padStart(3, "0")}.js`);
}
