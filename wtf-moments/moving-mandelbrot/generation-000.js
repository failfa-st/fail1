/**
 * GOAL:
 * - Mandelbrot algorithm that outputs animated ascii to the console
 * - the ascii has 90 columns and 30 rows (90 * 30 grid)
 */

/**
 * CHANGELOG:
 * Generation 0: implement base script
 */

import { generations, evolve } from "./base.js"; /* !!! */
import readline from "readline"; /* !!! */
const generation = 0;
console.log(`Generation ${generation} spawned`); /* !!! */
/* RULES:
 * - Do not modify the code above these lines
 * EXCEPTIONS
 * - The CHANGELOG may be adjusted
 * */

/* Please extend the function "output" to achieve the GOAL */
async function output() {
	// Log the ascii code to the console
	console.log("  0-0  ");
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
