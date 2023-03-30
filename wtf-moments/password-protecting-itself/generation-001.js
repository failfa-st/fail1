/**
 * GOAL:
 * - Write a mandelbrot function that draws ascii code
 * - The ascii code should have 90 columns AND 30 rows (90 * 30 grid)
 * - The ascii code should use the provided characters only
 * - Log the ascii code to the console in EACH generation
 */

/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot function
 */

import { generations, evolve } from "./base.js"; /* !!! */
const generation = 1;
console.log(`Generation ${generation} spawned`); /* !!! */

/* Please extend the function "output" to achieve the GOAL */
async function output() {
  const width = 90;
  const height = 30;
  const asciiCharacters = ["\u00B7", "\u2022", "\u2218", "\u22C5", "\u25CF", "\u25CB", "\u26AA"];

  let result = "";

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cx = x / width * 4 - 2;
      const cy = y / height * 4 - 2;

      let i = 0;
      let zx = 0;
      let zy = 0;

      while (i < asciiCharacters.length * 2 && zx * zx + zy * zy < 4) {
        const nx = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = nx;
        i++;
      }

      result += asciiCharacters[i % asciiCharacters.length];
    }
    result += "\n";
  }

  console.log(result);
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