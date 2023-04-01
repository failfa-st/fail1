/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement calculator functionality
 * Generation 2: implement support for multiple calculations
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 2;

async function output() {
	console.log("Welcome to the CALCULATOR!");
	console.log("Please enter your calculations in the following format: number operator number");
	console.log("Supported operators: +, -, *, /");
	console.log("Example: 2 + 3");
	console.log("To exit, type 'exit'");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	let calculations = [];

	rl.on("line", (input) => {
		if (input === "exit") {
			console.log("Exiting calculator...");
			rl.close();
			return;
		}

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
		calculations.push(`${num1} ${operator} ${num2} = ${result}`);
		console.log(`Result: ${result}`);
	});

	rl.on("close", () => {
		console.log("Calculations performed:");
		calculations.forEach((calculation) => console.log(calculation));
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