/**
 * GOAL:
 * - Write a mandelbrot algorithm that draws ascii
 * - log the ascii mandelbrot to the console for every generation
 */

/**
 * CHANGELOG:
 * Generation 0: implement base script
 */

import { generations, evolve } from "./base.js"; /* !!! */
const generation = 0; /* !!! */
console.log(`Generation ${generation} born`); /* !!! */
/* RULES:
 * - Do not modify the code above these lines
 * Exceptions
 * - The CHANGELOG may be adjusted
 * */
if (generation < generations) {
	try {
		await evolve(generation); /* !!! */
	} catch (error) {
		console.error(error);
	}
} else {
	console.log("GOAL achieved!");
}
