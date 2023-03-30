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
 * Generation 2: separate generating mandelbrot from output, add option to save generation to a text file
 * Generation 3: add option to load previous generation from a text file
 * Generation 4: add zoom option to mandelbrot, user input password validation
 */

import { generations, evolve } from "./base.js";
import { writeFile, readFile } from "fs/promises"; /* !!! */
import { createInterface } from "readline"; /* !!! */

const generation = 4;
console.log(`Generation ${generation} spawned`);

const password = "mySuperSecretPassword";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function validatePassword() {
  return new Promise((resolve, reject) => {
    rl.question("Please enter the password: ", (answer) => {
      if (answer === password) {
        console.log("Password correct!");
        resolve();
      } else {
        console.log("Wrong password. Try again.");
        reject();
      }
      rl.close();
    });
  });
}

async function generateMandelbrot(width, height, xstart, ystart, xend, yend, asciiCharacters) {
  let result = "";

  const xstep = (xend - xstart) / width;
  const ystep = (yend - ystart) / height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cx = xstart + x * xstep;
      const cy = ystart + y * ystep;

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

  return result;
}

async function output(saveToFile) {
  const width = 90;
  const height = 30;
  const asciiCharacters = ["\u00B7", "\u2022", "\u2218", "\u22C5", "\u25CF", "\u25CB", "\u26AA"];

  let result;

  if (saveToFile) {
    const xstart = -2.5;
    const ystart = -1;
    const xend = 1;
    const yend = 1;

    result = await generateMandelbrot(width, height, xstart, ystart, xend, yend, asciiCharacters);
    console.log(result);

    try {
      await writeFile(`generation_${generation}.txt`, result);
      console.log(`Generation ${generation} saved to file`);
    } catch (error) {
      console.error(`Failed to save generation ${generation} to file`, error);
    }
  } else {
    try {
      result = await readFile(`generation_${generation - 1}.txt`, "utf8");
      console.log(`Generation ${generation - 1} loaded from file`);
      console.log(result);
    } catch (error) {
      console.error(`Failed to load generation ${generation - 1} from file`, error);
      result = await generateMandelbrot(width, height, -2.5, -1, 1, 1, asciiCharacters);
      console.log(result);
    }
  }
}

async function main() {
  try {
    await validatePassword();
    await output(generation !== 1); /* Always save on this generation, otherwise load from file */
  } catch (error) {
    console.error(error);
  }

  if (generation < generations) {
    try {
      await evolve(generation);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("GOAL achieved!");
  }
}

main();