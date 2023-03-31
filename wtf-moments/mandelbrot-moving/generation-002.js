/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot algorithm and output to console
 * Generation 2: add ability to zoom in and out of the mandelbrot set using arrow keys
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 2;
console.log(`Generation ${generation} spawned`);

const WIDTH = 90;
const HEIGHT = 30;
const MAX_ITERATIONS = 100;
let zoom = 1;
let offsetX = 0;
let offsetY = 0;

async function output() {
  let output = "";
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const cx = (x - WIDTH / 2) * 4 / (WIDTH * zoom) - offsetX;
      const cy = (y - HEIGHT / 2) * 4 / (WIDTH * zoom) - offsetY;
      let zx = 0;
      let zy = 0;
      let i = 0;
      while (zx * zx + zy * zy < 4 && i < MAX_ITERATIONS) {
        const xt = zx * zx - zy * zy + cx;
        const yt = 2 * zx * zy + cy;
        zx = xt;
        zy = yt;
        i++;
      }
      const char = i === MAX_ITERATIONS ? " " : String.fromCharCode(32 + i % 16);
      output += char;
    }
    output += "\n";
  }
  console.log(output);
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
  if (key.name === "up") {
    zoom *= 1.1;
  } else if (key.name === "down") {
    zoom /= 1.1;
  } else if (key.name === "left") {
    offsetX -= 0.1 / zoom;
  } else if (key.name === "right") {
    offsetX += 0.1 / zoom;
  }
  output();
});

await output();

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  console.log("GOAL achieved!");
}