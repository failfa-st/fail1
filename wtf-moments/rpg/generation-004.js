/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: added basic game loop
 * Generation 2: added player object and inventory system
 * Generation 3: added items and ability to pick up and drop items
 * Generation 4: added rooms and ability to move between rooms
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 4;
console.log(`Generation ${generation} spawned`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const player = {
  name: "",
  inventory: [],
  location: "start",
};

const items = {
  key: {
    name: "key",
    location: "start",
    description: "A small, rusty key",
  },
  sword: {
    name: "sword",
    location: "cave",
    description: "A sharp, shiny sword",
  },
};

const rooms = {
  start: {
    name: "Start",
    description: "You are in a small room with a door to the north.",
    exits: {
      north: "cave",
    },
  },
  cave: {
    name: "Cave",
    description: "You are in a dark cave with a door to the south.",
    exits: {
      south: "start",
    },
  },
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
      console.log("- look: look around the room");
      console.log("- pick up [item]: pick up an item");
      console.log("- drop [item]: drop an item");
      console.log("- go [direction]: move to another room");
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
    } else if (input.toLowerCase() === "look") {
      console.log(rooms[player.location].description);
      console.log(`You see: ${Object.values(items)
        .filter((item) => item.location === player.location)
        .map((item) => item.description)
        .join(", ")}`);
    } else if (input.toLowerCase().startsWith("pick up ")) {
      const itemName = input.slice(8);
      const item = items[itemName];
      if (!item) {
        console.log(`There is no ${itemName} here.`);
      } else if (item.location !== player.location) {
        console.log(`You cannot pick up the ${itemName} from here.`);
      } else {
        player.inventory.push(itemName);
        item.location = "player";
        console.log(`You picked up the ${itemName}.`);
      }
    } else if (input.toLowerCase().startsWith("drop ")) {
      const itemName = input.slice(5);
      const itemIndex = player.inventory.indexOf(itemName);
      if (itemIndex === -1) {
        console.log(`You do not have a ${itemName} in your inventory.`);
      } else {
        player.inventory.splice(itemIndex, 1);
        items[itemName].location = player.location;
        console.log(`You dropped the ${itemName}.`);
      }
    } else if (input.toLowerCase().startsWith("go ")) {
      const direction = input.slice(3);
      const room = rooms[player.location].exits[direction];
      if (!room) {
        console.log(`You cannot go ${direction}.`);
      } else {
        player.location = room;
        console.log(`You are now in the ${rooms[player.location].name}.`);
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