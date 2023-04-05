/**
 * CHANGELOG:
 * Generation 0: implement base script
 */
import readline from "node:readline";
import logUpdate from "log-update";
import fs from "node:fs/promises";
import { generations, evolve } from "./base.js";

const generation = 0;

async function run() {
	// App logic
}

if (generation < generations) {
	await evolve(generation);
} else {
	await run();
}
