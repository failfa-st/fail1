/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: added basic game loop
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 1;
console.log(`Generation ${generation} spawned`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function output() {
  console.log("Welcome to the Text Based RPG!");
  console.log("Type 'help' for a list of commands.");
}

async function gameLoop() {
  while (true) {
    const input = await askQuestion("What would you like to do? ");
    if (input.toLowerCase() === "help") {
      console.log("Available commands:");
      console.log("- help: display this help message");
      console.log("- quit: exit the game");
    } else if (input.toLowerCase() === "quit") {
      console.log("Thanks for playing!");
      break;
    } else {
      console.log("Invalid command. Type 'help' for a list of commands.");
    }
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function startGame() {
  await output();
  await gameLoop();
}

startGame();

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  console.log("GOAL achieved!");
}