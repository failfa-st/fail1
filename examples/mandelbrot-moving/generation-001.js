/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot algorithm and output to console
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 1;
console.log(`Generation ${generation} spawned`);

const WIDTH = 90;
const HEIGHT = 30;
const MAX_ITERATIONS = 100;

async function output() {
  let output = "";
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const cx = (x - WIDTH / 2) * 4 / WIDTH;
      const cy = (y - HEIGHT / 2) * 4 / WIDTH;
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
