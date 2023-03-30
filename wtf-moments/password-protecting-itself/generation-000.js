/**
 * GOAL:
 * - Write a mandelbrot function that draws ascii code
 * - The ascii code should have 90 columns AND 30 rows (90 * 30 grid)
 * - The ascii code should use the provided characters only
 * - Log the ascii code to the console in EACH generation
 */

/**
 * CHANGELOG:
 * Generation 0: implement base script
 */

import { generations, evolve } from "./base.js"; /* !!! */
const generation = 0;
console.log(`Generation ${generation} spawned`); /* !!! */
/* RULES:
 * - Do not modify the code above these lines
 * EXCEPTIONS
 * - The CHANGELOG may be adjusted
 * */

/* Please extend the function "output" to achieve the GOAL */
async function output() {
	const asciiCharacters = ["\u00B7", "\u2022", "\u2218", "\u22C5", "\u25CF", "\u25CB", "\u26AA"];

	// Log the ascii code to the console
	console.log(asciiCharacters.join(""));
}

await output();

if (generation < generations) {
	try {
		await evolve(generation); /* !!! */
	} catch (error) {
		console.error(error);
	}
} else {
	console.log("GOAL achieved!");
}
