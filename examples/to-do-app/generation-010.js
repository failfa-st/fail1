/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add ability to add and list tasks
 * Generation 2: add ability to mark tasks as done and remove tasks
 * Generation 3: add ability to save and load tasks from a file
 * Generation 4: add ability to prioritize tasks
 * Generation 5: add ability to sort tasks by priority
 * Generation 6: add ability to edit tasks
 * Generation 7: add ability to search tasks by keyword
 * Generation 8: add ability to group tasks by priority
 * Generation 9: add ability to set reminders for tasks
 * Generation 10: add ability to set due dates for tasks
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import fs from "fs/promises";
import { CronJob } from "cron";
const generation = 10;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

async function output() {
  console.log("TODO LIST:");
  const groupedTasks = tasks.reduce((acc, task) => {
    if (task.priority) {
      if (!acc[task.priority]) {
        acc[task.priority] = [];
      }
      acc[task.priority].push(task);
    } else {
      if (!acc["none"]) {
        acc["none"] = [];
      }
      acc["none"].push(task);
    }
    return acc;
  }, {});
  Object.entries(groupedTasks).forEach(([priority, tasks]) => {
    console.log(`Priority: ${priority || "none"}`);
    tasks.sort((a, b) => {
      if (a.done && !b.done) {
        return 1;
      } else if (!a.done && b.done) {
        return -1;
      } else {
        return 0;
      }
    }).forEach((task, index) => {
      console.log(`\t${index + 1}. ${task.task}${task.done ? " (done)" : ""}${task.reminder ? ` [${task.reminder}]` : ""}${task.dueDate ? ` [${task.dueDate}]` : ""}`);
    });
  });
}

async function addTask() {
  rl.question("Enter task: ", async (answer) => {
    rl.question("Enter priority (optional): ", async (priority) => {
      rl.question("Enter reminder (optional): ", async (reminder) => {
        rl.question("Enter due date (optional): ", async (dueDate) => {
          tasks.push({ task: answer, done: false, priority: priority || null, reminder: reminder || null, dueDate: dueDate || null });
          console.log(`Task "${answer}" added to list`);
          await saveTasks();
          if (reminder) {
            setReminder(tasks.length - 1);
          }
          rl.close();
        });
      });
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

async function editTask() {
  rl.question("Enter task number: ", async (answer) => {
    const index = parseInt(answer) - 1;
    if (index < 0 || index >= tasks.length) {
      console.log("Invalid task number");
      rl.close();
      return;
    }
    rl.question(`Enter new task (current task: ${tasks[index].task}): `, async (newTask) => {
      rl.question(`Enter new priority (current priority: ${tasks[index].priority || "none"}): `, async (newPriority) => {
        rl.question(`Enter new reminder (current reminder: ${tasks[index].reminder || "none"}): `, async (newReminder) => {
          rl.question(`Enter new due date (current due date: ${tasks[index].dueDate || "none"}): `, async (newDueDate) => {
            tasks[index].task = newTask || tasks[index].task;
            tasks[index].priority = newPriority || null;
            tasks[index].reminder = newReminder || null;
            tasks[index].dueDate = newDueDate || null;
            console.log(`Task "${tasks[index].task}" edited`);
            await saveTasks();
            if (newReminder) {
              setReminder(index);
            }
            rl.close();
          });
        });
      });
    });
  });
}

async function searchTask() {
  rl.question("Enter keyword: ", async (answer) => {
    const filteredTasks = tasks.filter(task => task.task.includes(answer));
    if (filteredTasks.length === 0) {
      console.log(`No tasks found with keyword "${answer}"`);
    } else {
      console.log(`Tasks with keyword "${answer}":`);
      filteredTasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task}${task.done ? " (done)" : ""}${task.priority ? ` [${task.priority}]` : ""}${task.reminder ? ` [${task.reminder}]` : ""}${task.dueDate ? ` [${task.dueDate}]` : ""}`);
      });
    }
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

function setReminder(index) {
  const task = tasks[index];
  const job = new CronJob(task.reminder, () => {
    console.log(`Reminder: "${task.task}"`);
  });
  job.start();
}

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  await loadTasks();
  rl.question("What do you want to do? (add/list/done/remove/edit/search)", (answer) => {
    if (answer === "add") {
      addTask();
    } else if (answer === "list") {
      output();
    } else if (answer === "done") {
      markTaskAsDone();
    } else if (answer === "remove") {
      removeTask();
    } else if (answer === "edit") {
      editTask();
    } else if (answer === "search") {
      searchTask();
    } else {
      console.log("Invalid command");
      rl.close();
    }
  });
}