/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add Mandelbrot algorithm
 */

import { generations, evolve } from "./base.js";
const generation = 1;
console.log(`Generation ${generation} spawned`);

async function output() {
  // Define constants based on the output specs
  const WIDTH = 90;
  const HEIGHT = 30;

  // Define the range of the graph and the number of iterations (MAX_ITERATIONS)
  const xmin = -2;
  const xmax = 1;
  const ymin = -1;
  const ymax = 1;
  const MAX_ITERATIONS = 100;

  // Create an empty matrix of the required dimensions (90x30) (initial matrix)
  const matrix = Array(HEIGHT).fill().map(() => Array(WIDTH).fill(' '));

  // Iterate over each point in the matrix
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
	  // Convert matrix-coordinates to real numbers
      const a = xmin + (x / (WIDTH-1)) * (xmax - xmin);
      const b = ymax - (y / (HEIGHT-1)) * (ymax - ymin);

      let i = 0;
      let za = 0;
      let zb = 0;

	  // Iterate calculations until it exits the "bounding circle"
      while (i < MAX_ITERATIONS && (za * za + zb * zb) < 4) {
        const temp = za * za - zb * zb + a;
        zb = 2 * za * zb + b;
        za = temp;
        i++;
      }
	  
	  // Assign an ascii character to the corresponding matrix-coordinate according to the number of iterations MAX_ITERATIONS
      const char = i === MAX_ITERATIONS ? '*' : String.fromCharCode(32 + (i % 15));
      matrix[y][x] = char;
    }
  }

  // Log matrix to the console using nested loops
  for (let y = 0; y < matrix.length; y++) {
    let row = '';
    for (let x = 0; x < matrix[y].length; x++) {
      row += matrix[y][x];
    }
    console.log(row);
  }

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