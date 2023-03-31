/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement calculator functionality
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 1;

async function output() {
	console.log("Welcome to the CALCULATOR!");
	console.log("Please enter your calculation in the following format: number operator number");
	console.log("Supported operators: +, -, *, /");
	console.log("Example: 2 + 3");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on("line", (input) => {
		const [num1, operator, num2] = input.split(" ");
		let result;
		switch (operator) {
			case "+":
				result = Number(num1) + Number(num2);
				break;
			case "-":
				result = Number(num1) - Number(num2);
				break;
			case "*":
				result = Number(num1) * Number(num2);
				break;
			case "/":
				result = Number(num1) / Number(num2);
				break;
			default:
				console.log("Invalid operator");
				return;
		}
		console.log(`Result: ${result}`);
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