/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add ability to add and list tasks
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

async function output() {
  console.log("TODO LIST:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

async function addTask() {
  rl.question("Enter task: ", (answer) => {
    tasks.push(answer);
    console.log(`Task "${answer}" added to list`);
    rl.close();
  });
}

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  rl.question("What do you want to do? (add/list)", (answer) => {
    if (answer === "add") {
      addTask();
    } else if (answer === "list") {
      output();
    } else {
      console.log("Invalid command");
      rl.close();
    }
  });
}