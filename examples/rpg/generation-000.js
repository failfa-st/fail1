/**
 * GOAL:
 * - Text based RPG in the console based on readline
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
