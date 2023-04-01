/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add check for existence of my-app folder and create react app if it doesn't exist
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import fs from "fs/promises";
import { exec } from "child_process";
const generation = 1;

async function checkFolder() {
	try {
		await fs.access("my-app");
	} catch (error) {
		console.log("my-app folder does not exist, creating new react project...");
		exec("npx create-react-app my-app", (error, stdout, stderr) => {
			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
	}
}

if (generation < generations) {
	try {
		await evolve(generation);
	} catch (error) {
		console.error(error);
	}
} else {
	await checkFolder();
}
