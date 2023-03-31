/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: added basic game loop
 * Generation 2: added player object and inventory system
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 2;
console.log(`Generation ${generation} spawned`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const player = {
  name: "",
  inventory: [],
};

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
      console.log("- name: set your player name");
      console.log("- inventory: show your inventory");
    } else if (input.toLowerCase() === "quit") {
      console.log("Thanks for playing!");
      break;
    } else if (input.toLowerCase() === "name") {
      const name = await askQuestion("What is your name? ");
      player.name = name;
      console.log(`Your name is now ${player.name}.`);
    } else if (input.toLowerCase() === "inventory") {
      if (player.inventory.length === 0) {
        console.log("Your inventory is empty.");
      } else {
        console.log("Your inventory:");
        player.inventory.forEach((item) => console.log(`- ${item}`));
      }
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