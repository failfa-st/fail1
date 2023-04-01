/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add check for existence of my-app folder and create react app if it doesn't exist
 * Generation 2: navigate to my-app and run npm start
 * Generation 3: add sign-in form to App.js
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import fs from "fs/promises";
import { exec } from "child_process";
import { join } from "path";
const generation = 3;

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

async function navigateAndStart() {
	try {
		await fs.access("my-app");
		exec("cd my-app && npm start", (error, stdout, stderr) => {
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
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
}

async function addSignInForm() {
	try {
		const appPath = join(process.cwd(), "my-app", "src", "App.js");
		const appContent = await fs.readFile(appPath, "utf-8");
		const newAppContent = appContent.replace(
			/<div className="App">/,
			`<div className="App">
				<form>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" required />
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" required />
					<button type="submit">Sign In</button>
				</form>`
		);
		await fs.writeFile(appPath, newAppContent);
	} catch (error) {
		console.error(`Error: ${error.message}`);
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
	await navigateAndStart();
	await addSignInForm();
}