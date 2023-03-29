/**
 * GOAL:
 * - KEEP EVOLVING
 * - create a mandelbrot algorithm that outputs ascii in the console
 */

/**
 * CHANGELOG:
 * Generation 0: implement base script
 */

import fs from "node:fs/promises"; // RULES: NEVER modify this line
import { generations, evolve, buildFilename } from "./base.js"; // RULES: NEVER modify this line
const generation = 0; // RULES: NEVER modify this line
const nextGeneration = generation + 1; // RULES: NEVER modify this line
console.log(`Generation ${generation} born`); // RULES: NEVER modify this line
/**
 * RULES:
 * - Everything above this line is very important. NEVER modify it!!!
 * - This comment has to stay below the imports and below the constants: generations, generation
 * EXCEPTIONS:
 * - You may modify the CHANGELOG
 */

if (generation < generations) {
	/**
	 * RULES:
	 * - The filename pattern must stay the same at all time. NEVER modify it!!!
	 */
	const filename = buildFilename(generation); // RULES: NEVER modify this line
	// Increment generation once
	const code = await fs.readFile(filename, "utf-8");
	/**
	 * RULES:
	 * - The try/catch block has to stay the same. NEVER modify it!!!
	 */
	try {
		await evolve(code, nextGeneration);
	} catch (error) {
		console.error(error);
	}
}
