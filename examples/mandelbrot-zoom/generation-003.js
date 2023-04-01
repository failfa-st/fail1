/**
 * CHANGELOG:
 * Generation 1: implement Mandelbrot algorithm
 * Generation 2: add color to the Mandelbrot set
 * Generation 3: add zoom functionality to the Mandelbrot set
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 3;

async function output() {
	const width = 90;
	const height = 30;
	let xMin = -2;
	let xMax = 1;
	let yMin = -1;
	let yMax = 1;
	const maxIterations = 100;

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question("Enter zoom level (1-10): ", (zoomLevel) => {
		if (zoomLevel >= 1 && zoomLevel <= 10) {
			const zoomFactor = Math.pow(2, zoomLevel - 5);
			xMin /= zoomFactor;
			xMax /= zoomFactor;
			yMin /= zoomFactor;
			yMax /= zoomFactor;

			let outputString = "";

			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const a = xMin + (xMax - xMin) * x / (width - 1);
					const b = yMin + (yMax - yMin) * y / (height - 1);

					let real = 0;
					let imaginary = 0;
					let iteration = 0;

					while (real * real + imaginary * imaginary <= 4 && iteration < maxIterations) {
						const tempReal = real * real - imaginary * imaginary + a;
						const tempImaginary = 2 * real * imaginary + b;
						real = tempReal;
						imaginary = tempImaginary;
						iteration++;
					}

					if (iteration === maxIterations) {
						outputString += " ";
					} else {
						const color = iteration % 16;
						const asciiIndex = Math.floor(iteration / (maxIterations / 10));
						outputString += `\x1b[38;5;${color}m${String.fromCharCode(48 + asciiIndex)}\x1b[0m`;
					}
				}
				outputString += "\n";
			}

			console.log(outputString);
		} else {
			console.log("Invalid zoom level. Please enter a number between 1 and 10.");
		}

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