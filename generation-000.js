/**
 * CHANGELOG:
 * Generation 0: implement base script
 */

import terminalKit from "terminal-kit";

import { generations, evolve } from "./base.js";
const generation = 0;

const term = terminalKit.terminal;

async function runApp() {
	// Add app functionality
}

if (generation < generations) {
	try {
		await evolve(generation);
	} catch (error) {
		console.error(error);
	}
} else {
	await runApp();
}
