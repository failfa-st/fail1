/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add quiz functionality
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import process from "node:process";
import fs from "node:fs";
const generation = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What is the largest country in the world?",
    answer: "Russia",
  },
  {
    question: "What is the currency of Japan?",
    answer: "Yen",
  },
];

async function output() {
  console.log("Congratulations! You have completed the quiz.");
}

async function quiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i].question;
    const answer = questions[i].answer;
    const userAnswer = await new Promise((resolve) => {
      rl.question(question + " ", (answer) => {
        resolve(answer);
      });
    });
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
      console.log("Correct!");
      score++;
    } else {
      console.log(`Incorrect. The correct answer is ${answer}.`);
    }
  }
  console.log(`You scored ${score} out of ${questions.length}.`);
}

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  await quiz();
}