/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot algorithm and output to console
 * Generation 2: add ability to zoom in and out of the mandelbrot set using arrow keys
 * Generation 3: add ability to move the view using WASD keys
 * Generation 4: add ability to change the maximum number of iterations using the "=" and "-" keys
 * Generation 5: add ability to change the color scheme of the mandelbrot set using the "c" key
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
const generation = 5;
console.log(`Generation ${generation} spawned`);

const WIDTH = 90;
const HEIGHT = 30;
let MAX_ITERATIONS = 100;
let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let colorScheme = "default";

function getColor(i) {
  if (colorScheme === "default") {
    return String.fromCharCode(32 + i % 16);
  } else if (colorScheme === "red") {
    return String.fromCharCode(32 + i % 16 + 160);
  } else if (colorScheme === "green") {
    return String.fromCharCode(32 + i % 16 + 176);
  } else if (colorScheme === "blue") {
    return String.fromCharCode(32 + i % 16 + 192);
  }
}

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
      const char = i === MAX_ITERATIONS ? " " : getColor(i);
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
    offsetY -= 0.1 / zoom;
  } else if (key.name === "down") {
    offsetY += 0.1 / zoom;
  } else if (key.name === "left") {
    offsetX -= 0.1 / zoom;
  } else if (key.name === "right") {
    offsetX += 0.1 / zoom;
  } else if (key.name === "w") {
    offsetY -= 0.1 / zoom;
  } else if (key.name === "s") {
    offsetY += 0.1 / zoom;
  } else if (key.name === "a") {
    offsetX -= 0.1 / zoom;
  } else if (key.name === "d") {
    offsetX += 0.1 / zoom;
  } else if (key.name === "=") {
    MAX_ITERATIONS += 10;
  } else if (key.name === "-") {
    MAX_ITERATIONS -= 10;
    if (MAX_ITERATIONS < 10) {
      MAX_ITERATIONS = 10;
    }
  } else if (key.name === "c") {
    if (colorScheme === "default") {
      colorScheme = "red";
    } else if (colorScheme === "red") {
      colorScheme = "green";
    } else if (colorScheme === "green") {
      colorScheme = "blue";
    } else if (colorScheme === "blue") {
      colorScheme = "default";
    }
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