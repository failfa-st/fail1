/**
 * CHANGELOG:
 * Generation 0: implement base script
 */
import fs from "node:fs/promises";
import readline from "node:readline";
import chalk from "chalk";
import logUpdate from "log-update";

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
