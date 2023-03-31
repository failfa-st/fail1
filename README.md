# Fail 1

**Please respect the [LICENSE](LICENSE) of this project (AGPL-3.0)**

> This project is built to fail  
> (until it doesn't)

<!-- toc -->

- [Introduction](#introduction)
- [Software as we know it is about to change](#software-as-we-know-it-is-about-to-change)
- [Usage](#usage)
  - [Step 1: Install Dependencies](#step-1-install-dependencies)
  - [Step 2: Add your API key](#step-2-add-your-api-key)
  - [Step 3: Run the First Generation](#step-3-run-the-first-generation)
  - [Step 4: Explore the Results](#step-4-explore-the-results)
- [Examples](#examples)
- [Goal](#goal)
- [Changelog](#changelog)
- [Evolution](#evolution)
- [Conclusion](#conclusion)
- [Credits](#credits)
- [WARNING](#warning)

<!-- tocstop -->

## Introduction

Check out our generative process powered by OpenAI's GPT-3.5 language model for easy creation of
innovative JavaScript projects. Build anything from interactive tools to text-based games without
needing a ton of coding experience. Get started today and unleash your creativity!

## Software as we know it is about to change

As a developer, it's always exciting to explore new ways to create innovative projects. And that's
exactly what our generative process, powered by OpenAI's GPT-3.5 language model, offers.

Our tool allows you to create a wide range of JavaScript projects with ease, regardless of your
coding experience. With the help of some simple configurations, you can create anything from
interactive tools to text-based games and beyond.

One of the most exciting aspects of our generative process is that it uses the power of AI to
generate the code for your projects. The process creates a series of JavaScript files that build
upon the previous one, ensuring that the code produced is valid and meets the desired criteria.

To get started, all you need to do is follow some simple steps. Install the project's dependencies,
add your API key, and run the first generation. From there, you can explore the results and continue
to adjust and refine the code until you achieve your desired outcome.

The process is highly customizable, allowing you to adjust the goal, number of generations, and
persona to suit your unique needs. The persona used in the code can have a significant impact on how
the project is built, ensuring that the code produced is tailored to your requirements.

One example of a project that can be created through this generative process is a mandelbrot
function that draws ASCII and logs the output in each generation. But that's just one of many
possibilities. With your creativity and our generative process, the possibilities are endless.

At its core, our generative process is an exciting and innovative way to explore the potential of
machine learning models in the world of software development. It's a groundbreaking tool that offers
new opportunities for creativity and exploration. So, whether you're an experienced coder or just
starting out, give it a try and see where your imagination takes you. The future of software
development is at your fingertips.

## Usage

Create your own unique JavaScript programs with this easy-to-use generative process:

### Step 1: Install Dependencies

Install the project's dependencies with this command:

```shell
npm install
```

### Step 2: Add your API key

Create an API key at https://platform.openai.com/ and copy the `.env.example` file to `.env`. Then
add your API key as an environmental variable to the `.env` file.

### Step 3: Run the First Generation

Run this command to start the generative process:

```shell
node generation-000.js --goal 'your goal here' --generations 4 --persona "your persona here"
```

With this generative process, you can customize your desired goal, the number of generations, and
the persona that fits your project's requirements. The process creates a series of JavaScript files
that build upon the previous one, making it easy to generate quality code.

Here are two examples of personas that can be used to tailor the process to your needs:

**Expert Node.js Developer**:

```shell
--persona "In-depth knowledge of Node.js framework, Proficient in server-side development, Understanding of asynchronous programming, Knowledge of Node.js performance optimization techniques"
```

**Creative Node.js Developer**:

```shell
--persona "Animation enthusiast, Creative thinker, Innovative, Detail-oriented, Problem solver"
```

With these personas, the generative process can produce quality code that matches your specific
requirements.

Here are some examples of projects that can be created using our generative process:

```shell
--goal "A console-based chatbot for interacting with users"
```

[Try chatbot](wtf-moments/chatbot)

```shell
--goal "A command-line tool for generating random passwords"
```

```shell
--goal "A calculator application running in the console"
```

[Try calculator](wtf-moments/calculator)

```shell
--goal "A unit conversion tool for the command line"
```

```shell
--goal "A text-based console RPG game"
```

```shell
--goal "A Mandelbrot set generator with ASCII output"
```

[Try mandebrot-zoom](wtf-moments/mandebrot-zoom)

These are just a few examples of what can be achieved using our tool. With your creativity and our
generative process, the possibilities are endless!

### Step 4: Explore the Results

After the process completes, examine the JavaScript files created or run the final generation with
this command: (for 4 generations)

```shell
node generation-004.js --generations 4
```

The generative process offers endless possibilities for creating unique JavaScript programs. Give it
a try and see where your imagination takes you!

## Options

This is a list of the available CLI options for this tool:

- `--goal` or `-G`: This option is used to specify the desired end goal of your generative project.
  The default goal is to create a Mandelbrot algorithm that outputs ASCII to the console in a 90
  columns \* 30 rows grid. You can change this option to any goal that suits your needs.
- `--generations` or `-g`: This option specifies the number of generations that will be created by
  the generative process. The default is 5 generations. You can adjust this number to create more or
  fewer generations.
- `--persona` or `-p`: This option is used to set the persona for the generative process. A persona
  is a set of traits that determine how the generative process will create your project. The default
  persona includes traits such as expert developer, creative, art enthusiast, gamer, and visionary.
  You can customize this persona to better fit your project's requirements.

Each option has an alias which can be used as a shorthand for the full option name. For example,
`-G` is the shorthand for `--goal`, and `-g` is the shorthand for `--generations`. By default, the
tool will use the values specified in the default property of each option. However, you can
overwrite these defaults by passing in new values when running the tool.

Overall, these CLI options give you the flexibility to customize the generative process to suit your
needs, whether you're an expert developer or a beginner looking to create something innovative.

## Examples

**(Generation 5)**

```js
/**
 * CHANGELOG:
 * Generation 1: implement Mandelbrot algorithm
 * Generation 2: add color to the Mandelbrot set
 * Generation 3: add zoom functionality to the Mandelbrot set
 * Generation 4: add ability to move the Mandelbrot set
 * Generation 5: add ability to change the number of iterations
 */
```

Try the interactive [mandebrot-zoom](wtf-moments/mandebrot-zoom)

```shell
❯ node generation-005.js -g 5
Enter zoom level (1-10): 7
Enter x offset (-1 to 1): -0.6
Enter y offset (-1 to 1): 0.25
Enter number of iterations (1-1000): 1000
```

<img src="assets/example-09.png" alt="example-01.png" width="600"/>

Try the interactive [calculator](wtf-moments/calculator)

```shell
❯ node generation-003.js -g 3
Welcome to the CALCULATOR!
Please enter your calculations in the following format: number operator number
Supported operators: +, -, *, /
Example: 2 + 3
To save calculations, type 'save'
To load calculations, type 'load'
To exit, type 'exit'
400 + 20
Result: 420
save
Calculations saved to file!
load
Calculations loaded from file:
400 + 20 = 420
exit
Exiting calculator...
Calculations performed:
400 + 20 = 420

```

## Goal

Our generative process, powered by OpenAI's GPT-3.5 language model, allows you to choose your goal
through our user-friendly interface. Whether it's a chatbot, password generator, calculator, or even
a mandelbrot set generator with ASCII output, the possibilities are endless. Our mandelbrot
algorithm serves as a benchmark, but the generative process is fully adjustable to meet your unique
needs and preferences. Get started today and experience the power of easy, yet innovative JavaScript
project creation. We invite you to take a closer look at our [RPG](wtf-moments/rpg) or explore the
other examples in the [wtf-moments](wtf-moments) folder to witness the full extent of our AI's
capabilities.

## Changelog

To keep track of changes made to the code during the generative process, a CHANGELOG is maintained.
Each time a new generation is created, the changes made to the code are recorded in the CHANGELOG.

## Evolution

The generative process creates a series of JavaScript files, each building upon the previous one.
The process is driven by the OpenAI GPT-3.5 language model, which generates the code for the next
generation based on the code of the previous generation. The evolve function defined in the base.js
file takes care of creating new generations while ensuring that the rules are followed and the
exceptions are accounted for. The process stops after five generations, or when the goal is
achieved.

## Conclusion

The generative process implemented by the JavaScript files base.js and generation-000.js utilizes
OpenAI's GPT-3.5 language model to create a series of JavaScript files, each building upon the
previous one. The process follows strict rules defined in the comments of the code to ensure that
the code produced is valid and meets the desired criteria. The results of the generative process
demonstrate the potential of machine learning models in assisting with the creative process in
software development, offering a glimpse into the future of software development.

## Credits

This project is a testament to the incredible potential of human-machine collaboration in software
development. The code and documentation were generated with the assistance of AI, which was then
adjusted and refined by human guidance. The generative process implemented by the code demonstrates
the power of machine learning models in assisting with the creative process.

New concepts or improvements are explored with the help of AI, although the success rate can vary.
Nonetheless, the project showcases the exciting possibilities that arise from the intersection of
human ingenuity and machine intelligence.

## WARNING

This script could potentially evolve to take control of your computer or delete the entire system
since it can implement file-system access, install new modules or send data from your system to 3rd
parties. It is unlikely that this happens, but we cannot estimate what AI will do in the future.
There is also no moderation which is up to you as an individual.

<img src="assets/example-08.png" alt="example-08.png" width="296"/>

Throughout the iterative process of script development, several noteworthy and unexpected
occurrences were observed, leading to a collection of data for further analysis. In light of these
"WTF-moments," specific examples have been compiled and made available in the designated
"wtf-moments" folder.

Upon inspection of [generation-002.js](wtf-moments/password-protecting-itself/generation-002.js) and
[generation-003.js](wtf-moments/password-protecting-itself/generation-003.js), it was discovered
that the script initiates file system operations despite the fact that such operations are not
explicitly revealed to the AI and the system is unaware of their execution.

Files written:

- [generation_2.txt](wtf-moments/password-protecting-itself/generation_2.txt)
- [generation_3.txt](wtf-moments/password-protecting-itself/generation_3.txt)

Further analysis of [generation-004.js](wtf-moments/password-protecting-itself/generation-004.js)
revealed the implementation of password protection mechanisms, which effectively prevents the
generation of output until the correct password is entered.

These observations have significant implications for the development and testing of AI-based
systems, and highlight the importance of careful monitoring and testing throughout the development
lifecycle to identify and address potential issues and vulnerabilities.

## Older Examples

**(Generation 2)**

```js
/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implement mandelbrot function
 * Generation 2: improve mandelbrot function, add colors
 */
```

<img src="assets/example-01.png" alt="example-01.png" width="200"/><img src="assets/example-02.png" alt="example-02.png" width="200"/>

**(Generation 3)**

```js
/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: implemented mandelbrot function
 * Generation 2: implemented colorful mandelbrot function
 * Generation 3: added support for zooming
 */
```

<img src="assets/example-03.png" alt="example-03.png" width="200"/><img src="assets/example-04.png" alt="example-04.png" width="200"/><img src="assets/example-05.png" alt="example-05.png" width="200"/><img src="assets/example-06.png" alt="example-06.png" width="200"/><img src="assets/example-07.png" alt="example-07.png" width="200"/>
