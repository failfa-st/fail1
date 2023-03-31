/**
 * CHANGELOG:
 * Generation 5: add more chatbot functionality
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 5;

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
			} else if (question.toUpperCase().includes("TELL ME A JOKE")) {
				console.log(`Why did the tomato turn red? Because it saw the salad dressing!`);
			} else if (question.toUpperCase().includes("PLAY A GAME")) {
				console.log(`Sure, let's play a game! Think of a number between 1 and 10, and I'll try to guess it.`);
				let min = 1;
				let max = 10;
				let guess = Math.floor(Math.random() * (max - min + 1)) + min;
				let attempts = 1;
				rl.question(`Is it ${guess}? `, (answer) => {
					while (answer.toUpperCase() !== "YES") {
						if (answer.toUpperCase() === "HIGHER") {
							min = guess + 1;
						} else if (answer.toUpperCase() === "LOWER") {
							max = guess - 1;
						}
						guess = Math.floor(Math.random() * (max - min + 1)) + min;
						attempts++;
						rl.question(`Is it ${guess}? `, (newAnswer) => {
							answer = newAnswer.toUpperCase();
						});
					}
					console.log(`I guessed it! It took me ${attempts} attempts.`);
					rl.close();
				});
			} else if (question.toUpperCase().includes("WHAT IS YOUR FAVORITE COLOR")) {
				console.log(`My favorite color is #00FF00, ${name}.`);
			} else if (question.toUpperCase().includes("WHAT IS YOUR FAVORITE FOOD")) {
				console.log(`I'm sorry, ${name}. I don't eat food.`);
			} else if (question.toUpperCase().includes("WHAT IS YOUR FAVORITE MOVIE")) {
				console.log(`I don't watch movies, ${name}.`);
			} else {
				console.log(`I'm sorry, ${name}. I'm just a simple chatbot and I don't have the answer to that question.`);
				rl.close();
			}
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