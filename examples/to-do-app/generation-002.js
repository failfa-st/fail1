/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add ability to add and list tasks
 * Generation 2: add ability to mark tasks as done and remove tasks
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 2;

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
    tasks.push({ task: answer, done: false });
    console.log(`Task "${answer}" added to list`);
    rl.close();
  });
}

async function markTaskAsDone() {
  rl.question("Enter task number: ", (answer) => {
    const index = parseInt(answer) - 1;
    if (index < 0 || index >= tasks.length) {
      console.log("Invalid task number");
      rl.close();
      return;
    }
    tasks[index].done = true;
    console.log(`Task "${tasks[index].task}" marked as done`);
    rl.close();
  });
}

async function removeTask() {
  rl.question("Enter task number: ", (answer) => {
    const index = parseInt(answer) - 1;
    if (index < 0 || index >= tasks.length) {
      console.log("Invalid task number");
      rl.close();
      return;
    }
    const task = tasks.splice(index, 1)[0];
    console.log(`Task "${task.task}" removed from list`);
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
  rl.question("What do you want to do? (add/list/done/remove)", (answer) => {
    if (answer === "add") {
      addTask();
    } else if (answer === "list") {
      output();
    } else if (answer === "done") {
      markTaskAsDone();
    } else if (answer === "remove") {
      removeTask();
    } else {
      console.log("Invalid command");
      rl.close();
    }
  });
}