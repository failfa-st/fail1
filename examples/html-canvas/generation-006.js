/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add code to create index.html and script.js files
 * Generation 2: add code to draw a flower on the canvas
 * Generation 3: add code to draw a stem and leaves on the canvas
 * Generation 4: add code to animate the flower
 * Generation 5: add code to draw a background and a sun
 * Generation 6: add code to make the canvas full-screen
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import fs from "fs";

const generation = 6;

async function output() {
  const indexHtmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Canvas Experiment</title>
        <style>
          html, body, canvas {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
        </style>
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

    // Set canvas dimensions to full-screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw background
    context.fillStyle = "skyblue";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sun
    context.beginPath();
    context.arc(canvas.width - 100, 100, 50, 0, 2 * Math.PI);
    context.fillStyle = "yellow";
    context.fill();

    // Draw a flower
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    // Draw petals
    context.beginPath();
    context.moveTo(centerX, centerY - radius);
    context.bezierCurveTo(
      centerX + radius / 2,
      centerY - radius / 2,
      centerX + radius / 2,
      centerY + radius / 2,
      centerX,
      centerY + radius
    );
    context.bezierCurveTo(
      centerX - radius / 2,
      centerY + radius / 2,
      centerX - radius / 2,
      centerY - radius / 2,
      centerX,
      centerY - radius
    );
    context.fillStyle = "yellow";
    context.fill();

    // Draw center
    context.beginPath();
    context.arc(centerX, centerY, radius / 5, 0, 2 * Math.PI);
    context.fillStyle = "orange";
    context.fill();

    // Draw stem
    context.beginPath();
    context.moveTo(centerX, centerY + radius);
    context.lineTo(centerX, centerY + radius * 2);
    context.lineWidth = 10;
    context.strokeStyle = "green";
    context.stroke();

    // Draw leaves
    context.beginPath();
    context.moveTo(centerX, centerY + radius * 2);
    context.bezierCurveTo(
      centerX - radius / 2,
      centerY + radius * 2,
      centerX - radius / 2,
      centerY + radius * 3,
      centerX,
      centerY + radius * 3
    );
    context.bezierCurveTo(
      centerX + radius / 2,
      centerY + radius * 3,
      centerX + radius / 2,
      centerY + radius * 2,
      centerX,
      centerY + radius * 2
    );
    context.fillStyle = "green";
    context.fill();

    // Animate the flower
    let angle = 0;
    setInterval(() => {
      angle += 0.1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Draw background
      context.fillStyle = "skyblue";
      context.fillRect(0, 0, canvas.width, canvas.height);
      // Draw sun
      context.beginPath();
      context.arc(canvas.width - 100, 100, 50, 0, 2 * Math.PI);
      context.fillStyle = "yellow";
      context.fill();
      context.save();
      context.translate(centerX, centerY);
      context.rotate(angle);
      context.translate(-centerX, -centerY);
      // Draw petals
      context.beginPath();
      context.moveTo(centerX, centerY - radius);
      context.bezierCurveTo(
        centerX + radius / 2,
        centerY - radius / 2,
        centerX + radius / 2,
        centerY + radius / 2,
        centerX,
        centerY + radius
      );
      context.bezierCurveTo(
        centerX - radius / 2,
        centerY + radius / 2,
        centerX - radius / 2,
        centerY - radius / 2,
        centerX,
        centerY - radius
      );
      context.fillStyle = "yellow";
      context.fill();
      // Draw center
      context.beginPath();
      context.arc(centerX, centerY, radius / 5, 0, 2 * Math.PI);
      context.fillStyle = "orange";
      context.fill();
      // Draw stem
      context.beginPath();
      context.moveTo(centerX, centerY + radius);
      context.lineTo(centerX, centerY + radius * 2);
      context.lineWidth = 10;
      context.strokeStyle = "green";
      context.stroke();
      // Draw leaves
      context.beginPath();
      context.moveTo(centerX, centerY + radius * 2);
      context.bezierCurveTo(
        centerX - radius / 2,
        centerY + radius * 2,
        centerX - radius / 2,
        centerY + radius * 3,
        centerX,
        centerY + radius * 3
      );
      context.bezierCurveTo(
        centerX + radius / 2,
        centerY + radius * 3,
        centerX + radius / 2,
        centerY + radius * 2,
        centerX,
        centerY + radius * 2
      );
      context.fillStyle = "green";
      context.fill();
      context.restore();
    }, 50);
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