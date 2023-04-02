/**
 * CHANGELOG:
 * Generation 0: implement base script
 */

import { generations, evolve } from "../../base.js";
import readline from "readline";
import process from "node:process";
const generation = 0;

async function output() {
	console.log("love");
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
