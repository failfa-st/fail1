/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot algorithm and ascii console output
 */

import readline from "node:readline";
import logUpdate from "log-update";
import fs from "node:fs/promises";
import { generations, evolve } from "./base.js";

const generation = 1;

async function run() {
	const width = process.stdout.columns;
	const height = process.stdout.rows - 2;

	const xMin = -2;
	const xMax = 1;
	const yMin = -1;
	const yMax = 1;

	const maxIterations = 100;

	let output = "";

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
				iterations === maxIterations ? " " : String.fromCharCode(97 + (iterations % 26));

			output += char;
		}

		output += "\n";
	}

	logUpdate(output);
}

if (generation < generations) {
	await evolve(generation);
} else {
	await run();
}