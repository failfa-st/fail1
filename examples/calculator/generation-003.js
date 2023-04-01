/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement calculator functionality
 * Generation 2: implement support for multiple calculations
 * Generation 3: implement support for saving and loading calculations
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import fs from "fs";
const generation = 3;

async function output() {
	console.log("Welcome to the CALCULATOR!");
	console.log("Please enter your calculations in the following format: number operator number");
	console.log("Supported operators: +, -, *, /");
	console.log("Example: 2 + 3");
	console.log("To save calculations, type 'save'");
	console.log("To load calculations, type 'load'");
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

		if (input === "save") {
			const data = calculations.join("\n");
			fs.writeFile("calculations.txt", data, (err) => {
				if (err) throw err;
				console.log("Calculations saved to file!");
			});
			return;
		}

		if (input === "load") {
			fs.readFile("calculations.txt", "utf8", (err, data) => {
				if (err) throw err;
				console.log("Calculations loaded from file:");
				console.log(data);
			});
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