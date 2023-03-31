/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add Mandelbrot algorithm
 * Generation 2: add user-defined coordinates range and max iterations
 * Generation 3: add optional Color Scheme
 */

import { generations, evolve } from "./base.js";
const generation = 3;
console.log(`Generation ${generation} spawned`);

// Define a function to get user input
async function getInput(prompt) {
  const { stdin, stdout } = process;
  return new Promise(resolve => {
    stdin.resume();
    stdout.write(prompt);
    stdin.on('data', data => resolve(data.toString().trim()));
  });
}

async function output() {
  // Define constants based on the output specs
  const WIDTH = 90;
  const HEIGHT = 30;

  // Get user-defined coordinates range and max iterations, or use default values
  const xmin = parseFloat(await getInput('Please enter the minimum x coordinate value: ')) || -2;
  const xmax = parseFloat(await getInput('Please enter the maximum x coordinate value: ')) || 1;
  const ymin = parseFloat(await getInput('Please enter the minimum y coordinate value: ')) || -1;
  const ymax = parseFloat(await getInput('Please enter the maximum y coordinate value: ')) || 1;
  const MAX_ITERATIONS = parseInt(await getInput('Please enter the maximum number of iterations (integer): ')) || 100;
  const USE_COLOR_SCHEME = (await getInput('Do you want to use a color scheme? (y/n): ')).toLowerCase() === 'y';

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

      let char = '';
      if (USE_COLOR_SCHEME) {
		  // Get the red, green and blue components of the color based on the number of iterations MAX_ITERATIONS
        const red = Math.floor(i % 16 * 16);
        const green = Math.floor(i % 32 * 8);
        const blue = Math.floor(i % 64 * 4);
		  // Assign the corresponding hexadecimal color value to the char variable
        char = `\x1b[48;2;${red};${green};${blue}m \x1b[0m`;
      } else {
		  // Assign an ascii character to the corresponding matrix-coordinate according to the number of iterations MAX_ITERATIONS if no color scheme is chosen
        char = i === MAX_ITERATIONS ? '*' : String.fromCharCode(32 + (i % 15));
      }
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