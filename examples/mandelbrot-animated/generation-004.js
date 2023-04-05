/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot algorithm and ascii console output
 * Generation 2: add ability to save output to file
 * Generation 3: add ability to specify output filename
 * Generation 4: add ability to zoom in and out
 */

import readline from "node:readline";
import logUpdate from "log-update";
import fs from "node:fs/promises";
import { generations, evolve } from "./base.js";

const generation = 4;

async function run() {
	const width = process.stdout.columns;
	const height = process.stdout.rows - 2;

	let xMin = -2;
	let xMax = 1;
	let yMin = -1;
	let yMax = 1;

	const maxIterations = 100;

	let output = "";

	function zoomIn() {
		const xRange = xMax - xMin;
		const yRange = yMax - yMin;

		xMin += xRange * 0.25;
		xMax -= xRange * 0.25;
		yMin += yRange * 0.25;
		yMax -= yRange * 0.25;

		render();
	}

	function zoomOut() {
		const xRange = xMax - xMin;
		const yRange = yMax - yMin;

		xMin -= xRange * 0.25;
		xMax += xRange * 0.25;
		yMin -= yRange * 0.25;
		yMax += yRange * 0.25;

		render();
	}

	function render() {
		output = "";

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const a = xMin + (xMax - xMin) * (x / width);
				const b = yMin + (yMax - yMin) * (y / height);

				let real = a;
				let imaginary = b;

				let iterations = 0;

				while (iterations < maxIterations) {
					const tempReal = real * real - imaginary * imaginary + a;
					const tempImaginary = 2 * real * imaginary + b;

					real = tempReal;
					imaginary = tempImaginary;

					if (real * real + imaginary * imaginary > 4) {
						break;
					}

					iterations++;
				}

				const char =
					iterations === maxIterations
						? " "
						: String.fromCharCode(97 + (iterations % 26));

				output += char;
			}

			output += "\n";
		}

		logUpdate(output);
	}

	render();

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.on("line", input => {
		switch (input) {
			case "i":
				zoomIn();
				break;
			case "o":
				zoomOut();
				break;
			case "s":
				rl.question("Do you want to save the output to a file? (y/n) ", async answer => {
					if (answer === "y") {
						rl.question("Enter a filename: ", async filename => {
							if (!filename) {
								filename = `mandelbrot_${Date.now()}.txt`;
							}
							await fs.writeFile(filename, output);
							console.log(`Output saved to ${filename}`);
							rl.prompt();
						});
					} else {
						rl.prompt();
					}
				});
				break;
			default:
				rl.prompt();
				break;
		}
	});

	rl.prompt();
}

if (generation < generations) {
	await evolve(generation);
} else {
	await run();
}
