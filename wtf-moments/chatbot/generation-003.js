/**
 * CHANGELOG:
 * Generation 3: add more chatbot functionality
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 3;

async function output() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question("Hello! What's your name? ", (name) => {
		console.log(`Nice to meet you, ${name}!`);
		rl.question("How can I assist you today? ", (question) => {
			if (question.toUpperCase().includes("HELLO")) {
				console.log(`Hello, ${name}!`);
			} else if (question.toUpperCase().includes("HOW ARE YOU")) {
				console.log(`I'm just a chatbot, I don't have feelings. But thank you for asking, ${name}!`);
			} else if (question.toUpperCase().includes("WHAT IS YOUR NAME")) {
				console.log(`My name is Chatbot, ${name}.`);
			} else if (question.toUpperCase().includes("WHAT TIME IS IT")) {
				console.log(`I'm sorry, ${name}. I don't have access to the current time.`);
			} else {
				console.log(`I'm sorry, ${name}. I'm just a simple chatbot and I don't have the answer to that question.`);
			}
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