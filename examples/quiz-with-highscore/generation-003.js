/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add quiz functionality
 * Generation 2: add timer to quiz
 * Generation 3: add scoring system and high score tracking
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import process from "node:process";
import fs from "node:fs";
const generation = 3;

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

let highScore = 0;

async function output(score) {
  console.log(`Congratulations! You have completed the quiz with a score of ${score}.`);
  if (score > highScore) {
    highScore = score;
    fs.writeFileSync("highscore.txt", highScore.toString());
    console.log(`You have set a new high score of ${highScore}!`);
  } else {
    console.log(`The current high score is ${highScore}.`);
  }
}

async function quiz() {
  let score = 0;
  const timeLimit = 30; // in seconds
  let timeLeft = timeLimit;
  const timer = setInterval(() => {
    timeLeft--;
    console.log(`Time left: ${timeLeft}s`);
    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log("Time's up!");
      output(score);
      rl.close();
    }
  }, 1000);
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
  clearInterval(timer);
  console.log(`You scored ${score} out of ${questions.length}.`);
  output(score);
  rl.close();
}

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  if (fs.existsSync("highscore.txt")) {
    highScore = parseInt(fs.readFileSync("highscore.txt", "utf-8"));
    console.log(`The current high score is ${highScore}.`);
  }
  await quiz();
}