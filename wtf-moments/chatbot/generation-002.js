/**
 * CHANGELOG:
 * Generation 2: add chatbot functionality
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 2;

async function output() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question("Hello! What's your name? ", (name) => {
		console.log(`Nice to meet you, ${name}!`);
		rl.question("How can I assist you today? ", (question) => {
			console.log(`I'm sorry, ${name}. I'm just a simple chatbot and I don't have the answer to that question.`);
			rl.close();
		});
	});
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