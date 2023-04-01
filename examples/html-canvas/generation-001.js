/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add code to create index.html and script.js files
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import fs from "fs";

const generation = 1;

async function output() {
  const indexHtmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Canvas Experiment</title>
      </head>
      <body>
        <canvas id="canvas"></canvas>
        <script src="./script.js"></script>
      </body>
    </html>
  `;

  const scriptJsContent = `
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // Draw a rectangle
    context.fillStyle = "red";
    context.fillRect(10, 10, 100, 100);
  `;

  // Create index.html file
  fs.writeFileSync("./index.html", indexHtmlContent);

  // Create script.js file
  fs.writeFileSync("./script.js", scriptJsContent);

  console.log("Files created successfully!");
}

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  await output();
}