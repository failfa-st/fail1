/**
 * CHANGELOG:
 * Generation 1: implement Mandelbrot algorithm
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 1;

async function output() {
	const width = 90;
	const height = 30;
	const xMin = -2;
	const xMax = 1;
	const yMin = -1;
	const yMax = 1;
	const maxIterations = 100;

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
				const asciiIndex = Math.floor(iteration / (maxIterations / 10));
				outputString += String.fromCharCode(48 + asciiIndex);
			}
		}
		outputString += "\n";
	}

	console.log(outputString);
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