/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add ability to add and list tasks
 * Generation 2: add ability to mark tasks as done and remove tasks
 * Generation 3: add ability to save and load tasks from a file
 * Generation 4: add ability to prioritize tasks
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import fs from "fs/promises";
const generation = 4;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

async function output() {
  console.log("TODO LIST:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task}${task.done ? " (done)" : ""}${task.priority ? ` [${task.priority}]` : ""}`);
  });
}

async function addTask() {
  rl.question("Enter task: ", async (answer) => {
    rl.question("Enter priority (optional): ", async (priority) => {
      tasks.push({ task: answer, done: false, priority: priority || null });
      console.log(`Task "${answer}" added to list`);
      await saveTasks();
      rl.close();
    });
  });
}

async function markTaskAsDone() {
  rl.question("Enter task number: ", async (answer) => {
    const index = parseInt(answer) - 1;
    if (index < 0 || index >= tasks.length) {
      console.log("Invalid task number");
      rl.close();
      return;
    }
    tasks[index].done = true;
    console.log(`Task "${tasks[index].task}" marked as done`);
    await saveTasks();
    rl.close();
  });
}

async function removeTask() {
  rl.question("Enter task number: ", async (answer) => {
    const index = parseInt(answer) - 1;
    if (index < 0 || index >= tasks.length) {
      console.log("Invalid task number");
      rl.close();
      return;
    }
    const task = tasks.splice(index, 1)[0];
    console.log(`Task "${task.task}" removed from list`);
    await saveTasks();
    rl.close();
  });
}

async function saveTasks() {
  try {
    await fs.writeFile("tasks.json", JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
}

async function loadTasks() {
  try {
    const data = await fs.readFile("tasks.json");
    tasks = JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  await loadTasks();
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