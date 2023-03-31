/**
 * CHANGELOG:
 * Generation 0: implement base script
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import process from "node:process";
import { Configuration, OpenAIApi } from "openai";
const generation = 0;

async function output() {
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "hi",
		max_tokens: 150,
	});
	console.log(completion.data.choices[0].text);
}

if (generation < generations) {
	try {
		await evolve(generation);
	} catch (error) {
		console.error(error);
	}
} else {
	await output();
}
