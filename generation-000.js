/**
 * CHANGELOG:
 * Generation 0: implement base script
 */
import terminalKit from "terminal-kit";
import { generations, evolve } from "./base.js";

const generation = 0;
const { terminal } = terminalKit;

async function run() {
	// App logic
}

if (generation < generations) {
	await evolve(generation);
} else {
	await run();
}
