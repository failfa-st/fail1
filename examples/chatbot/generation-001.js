/**
 * CHANGELOG:
 * Generation 1: add basic chat functionality
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 1;

async function output() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question("Hello! What's your name? ", (name) => {
		console.log(`Nice to meet you, ${name}!`);
		rl.close();
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