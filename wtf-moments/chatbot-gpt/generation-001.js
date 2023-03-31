/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add user input and response handling
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import process from "node:process";
import { Configuration, OpenAIApi } from "openai";
const generation = 1;

const configuration = new Configuration({
	apiKey: process.env.OPENAI_SECRET,
});

export const openai = new OpenAIApi(configuration);

async function output(prompt) {
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 150,
	});
	return completion.data.choices[0].text;
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("Hi, what's your name? ", async (name) => {
	const greeting = await output(`Hi, I'm a chatbot. What can I help you with today, ${name}?`);
	console.log(greeting);

	rl.on("line", async (input) => {
		const response = await output(input);
		console.log(response);
	});
});

if (generation < generations) {
	try {
		await evolve(generation);
	} catch (error) {
		console.error(error);
	}
} else {
	console.log("Chatbot ready!");
}