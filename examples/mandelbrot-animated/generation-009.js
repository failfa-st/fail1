/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot algorithm and ascii console output
 * Generation 2: add ability to save output to file
 * Generation 3: add ability to specify output filename
 * Generation 4: add ability to zoom in and out
 * Generation 5: add ability to change max iterations
 * Generation 6: add ability to set custom coordinates
 * Generation 7: add color to the output
 * Generation 8: add animated zoom
 * Generation 9: use a 90 columns by 38 rows grid
 */

import readline from "node:readline";
import logUpdate from "log-update";
import fs from "node:fs/promises";
import { generations, evolve } from "./base.js";

const generation = 9;

async function run() {
	const width = 90;
	const height = 38;

	let xMin = -2;
	let xMax = 1;
	let yMin = -1;
	let yMax = 1;

	let maxIterations = 100;

	let output = "";

	let zoomLevel = 0;
	let zoomDirection = 1;
	let zoomInterval = null;

	function zoomIn() {
		zoomDirection = 1;
		startZoom();
	}

	function zoomOut() {
		zoomDirection = -1;
		startZoom();
	}

	function startZoom() {
		if (zoomInterval) {
			clearInterval(zoomInterval);
		}

		zoomInterval = setInterval(() => {
			const zoomFactor = Math.pow(2, zoomDirection * 0.1);
			const xRange = xMax - xMin;
			const yRange = yMax - yMin;

			const xCenter = (xMax + xMin) / 2;
			const yCenter = (yMax + yMin) / 2;

			const newWidth = xRange / zoomFactor;
			const newHeight = yRange / zoomFactor;

			xMin = xCenter - newWidth / 2;
			xMax = xCenter + newWidth / 2;
			yMin = yCenter - newHeight / 2;
			yMax = yCenter + newHeight / 2;

			zoomLevel += zoomDirection;

			if (zoomLevel === 0) {
				clearInterval(zoomInterval);
				zoomInterval = null;
			}

			render();
		}, 50);
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

				const color =
					iterations === maxIterations
						? "\x1b[30m"
						: `\x1b[38;5;${(iterations % 16) + 16}m`;
				const char =
					iterations === maxIterations
						? " "
						: String.fromCharCode(97 + (iterations % 26));

				output += `${color}${char}\x1b[0m`;
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
			case "m":
				rl.question("Enter a new max iterations value: ", async answer => {
					const newMaxIterations = parseInt(answer);
					if (!isNaN(newMaxIterations)) {
						maxIterations = newMaxIterations;
						render();
					}
					rl.prompt();
				});
				break;
			case "c":
				rl.question("Enter xMin: ", async answer => {
					const newXMin = parseFloat(answer);
					if (!isNaN(newXMin)) {
						xMin = newXMin;
						render();
					}
					rl.question("Enter xMax: ", async answer => {
						const newXMax = parseFloat(answer);
						if (!isNaN(newXMax)) {
							xMax = newXMax;
							render();
						}
						rl.question("Enter yMin: ", async answer => {
							const newYMin = parseFloat(answer);
							if (!isNaN(newYMin)) {
								yMin = newYMin;
								render();
							}
							rl.question("Enter yMax: ", async answer => {
								const newYMax = parseFloat(answer);
								if (!isNaN(newYMax)) {
									yMax = newYMax;
									render();
								}
								rl.prompt();
							});
						});
					});
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
