# Fail 1

**Please respect the [LICENSE](LICENSE) of this project (AGPL-3.0)**

> This project is built to fail  
> (until it doesn't)

<!-- toc -->

- [Introduction](#introduction)
- [Getting Started Guide](#getting-started-guide)
  * [1. Prerequisites](#1-prerequisites)
  * [2. Clone the repository](#2-clone-the-repository)
  * [3. Install dependencies](#3-install-dependencies)
  * [4. Add your API key](#4-add-your-api-key)
  * [5. Run the First Generation](#5-run-the-first-generation)
  * [6. Explore the Results](#6-explore-the-results)
  * [7. Customize the Generative Process (Optional)](#7-customize-the-generative-process-optional)
  * [8. Learn and Iterate](#8-learn-and-iterate)
- [Options](#options)
  * [Learn JavaScript](#learn-javascript)
- [Driving Your Project Forward with Progressive Generations](#driving-your-project-forward-with-progressive-generations)
  * [Step 1: Initial generation](#step-1-initial-generation)
  * [Step 2: Adding a new feature](#step-2-adding-a-new-feature)
  * [Step 3: Refactoring code](#step-3-refactoring-code)
  * [Step 4: Fixing bugs](#step-4-fixing-bugs)
- [Understanding the Concept: A Comprehensive Guide](#understanding-the-concept-a-comprehensive-guide)
  * [Goal](#goal)
  * [Changelog](#changelog)
  * [Evolution](#evolution)
  * [Conclusion](#conclusion)
  * [Acknowledgements](#acknowledgements)
  * [Caution](#caution)
- [Examples](#examples)
  * [Calculator](#calculator)
  * [Chatbot](#chatbot)
  * [Mandelbrot](#mandelbrot)
  * [Password Protecting Itself](#password-protecting-itself)
  * [React App Form](#react-app-form)
  * [RPG](#rpg)
  * [Search Engine](#search-engine)
  * [Links](#links)

<!-- tocstop -->

## Introduction

Welcome to the future of software development! Our generative process, powered by OpenAI's GPT-3.5
language model, marks the dawn of a new era. We are just scratching the surface of what's possible
with machine learning models and their integration into software development. The possibilities are
endless and the potential for innovation is unparalleled.

From console-based drawing apps to chatbots and search engines, our generative process is designed
to assist you in creating innovative software projects with ease. We invite skeptics and
non-believers alike to explore the potential of AI and machine learning in the realm of software
development. Join us as we enter a new era of software development, where the possibilities are
limitless and the future is bright.

## Getting Started Guide

This guide will walk you through the process of using our generative process powered by OpenAI's
GPT-3.5 language model to create innovative JavaScript projects. You'll learn how to install
dependencies, add your API key, run the first generation, and explore the results.

### 1. Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 18.x or higher): https://nodejs.org/en/download/
- npm (usually bundled with Node.js): https://www.npmjs.com/get-npm

### 2. Clone the repository

Clone the repository to your local machine:

```shell
git clone git@github.com:failfa-st/fail1.git
```

Navigate to the project directory:

```shell
cd fail1
```

### 3. Install dependencies

Install the required dependencies by running:

```shell
npm install
```

### 4. Add your API key

Create an account at https://platform.openai.com/signup and obtain your API key.

Copy the `.env.example` file to `.env`:

```shell
cp .env.example .env
```

Open the `.env` file and add your OpenAI API key:

```shell
OPENAI_API_KEY=your_api_key_here
```

### 5. Run the First Generation

Start the generative process with a specific goal and persona:

```shell
node generation-000.js --goal 'your goal here' --persona "your persona here"
```

For example, if you want to create a console-based chatbot:

```shell
node generation-000.js --goal 'console-based chatbot' --persona "expert Node.js developer"
```

### 6. Explore the Results

After the generative process completes, you can examine the created JavaScript files or run the
final generation. For example, if the process generated 4 generations:

```shell
node generation-004.js
```

### 7. Customize the Generative Process (Optional)

You can customize the generative process using various command-line options such as goal,
generations, persona, and temperature. For example:

```shell
node generation-000.js -G "console RPG game" -g 5 -p "creative Node.js developer, RPG enthusiast" -t 0.3
```

This command sets the goal to "console RPG game", the number of generations to 5, the persona to
"creative Node.js developer, RPG enthusiast", and the temperature to 0.3.

### 8. Learn and Iterate

Study the generated code, learn from it, and use it as a starting point for your projects. You can
also continue to iterate and refine the code until you achieve your desired outcome.

Congratulations! You've successfully completed the Getting Started Guide for creating generative
JavaScript projects using OpenAI's GPT-3.5 language model. Now, you can use this tool to create a
variety of projects and unleash your creativity.

## Options

The following are the command-line interface (CLI) options available when running the generative
process:

- `-G`, `--goal`: Sets the desired goal for the generative process. The default is a mandelbrot
  algorithm that outputs ASCII to the console in a 90 columns \* 30 rows grid.
- `-g`, `--generations`: Sets the number of generations that will be created by the generative
  process. The default is 1.
- `-p`, `--persona`: Sets the persona or profile for the generative process. This can include
  factors such as expertise level, creativity, and interests. The default is an expert Node.js
  developer with a creative mindset.
- `-t`, `--temperature`: Sets the temperature parameter for the OpenAI API. This controls the
  "creativity" of the generative process, with higher temperatures resulting in more unpredictable
  output. The default is 0.2.

These options allow you to customize the generative process to better suit your needs and
preferences. For example, you can set a specific goal for the generative process, adjust the number
of generations to generate, and even fine-tune the "creativity" level of the output. Use these
options to explore the full potential of the generative process and unlock your creativity.

To use these options, you can pass them to the CLI command when running the generative process.
Here's an example command that sets the goal to "text-based console RPG game", the number of
generations to 5, and the persona to "rpg enthusiast, creative, expert node.js developer,
detail-oriented":

```shell
node generation-000.js -G "text-based console RPG game" -g 5 -p "rpg enthusiast, creative, expert node.js developer, detail-oriented"
```

### Learn JavaScript

If you're eager to learn, this is the perfect opportunity for you! Simply run the following command
in your shell:

```shell
node generation-000.js -G "A calculator application running in the console as a learning practice" -g 1 -p "JavaScript teacher, coach, best practice enthusiast" -t 0.8
```

This will generate a calculator application that runs in the console, and it's tailored towards
those who are new to JavaScript development. So go ahead and give it a try!

## Driving Your Project Forward with Progressive Generations

### Step 1: Initial generation

Begin by starting with the initial `generation-000.js` file and set the `goal` and `persona` flags
to guide the direction of your project. This sets the foundation for the rest of the generative
process.

```shell
node generation-000.js -g 3 -G 'console-based drawing app' -p "junior developer"
```

### Step 2: Adding a new feature

As the project evolves, you can create a new generation of the codebase and focus on adding new
features. To do this, create the last generation-x.js file where x is the last available number in
the sequence. Set the `generations` flag to specify how many generations the new file will be based
on. Update the goal flag to define the new feature, and change the `persona` flag to match the
expertise needed for this feature.

```shell
node generation-003.js -g 5 -G 'add user interaction' -p "expert ux engineer, node.js expert"
```

### Step 3: Refactoring code

Refactoring is an important aspect of the generative process that ensures the quality of the
codebase. You can create a new generation of the codebase with the goal of refactoring the existing
code. Set the `generations` flag to specify how many generations the new file will be based on.
Update the goal flag to describe the refactoring task, and change the `persona` flag to match the
expertise needed for the task.

```shell
node generation-005.js -g 6 -G 'refactor code' -p "senior developer, code optimization expert"
```

### Step 4: Fixing bugs

Bug fixing is another crucial step in software development. You can create a new generation of the
codebase with the goal of fixing a bug. Set the `generations` flag to specify how many generations
the new file will be based on. Update the `goal` flag to describe the bug, and change the `persona`
flag to match the expertise needed for the task.

```shell
node generation-006.js -g 7 -G 'fix bug where color red would print undefined' -p "profound knowledge of Node.js, debugging expert"
```

By following these steps, you can drive your project forward with progressive generations, adding
new features, optimizing code, fixing bugs, and more. This approach allows for a structured and
efficient development process, while still maintaining flexibility and adaptability.

## Understanding the Concept: A Comprehensive Guide

### Goal

Our generative process, powered by OpenAI's GPT-3.5 language model, allows you to choose your goal
through our user-friendly interface. Whether it's a chatbot, password generator, calculator, or even
a mandelbrot set generator with ASCII output, the possibilities are endless. Our mandelbrot
algorithm serves as a benchmark, but the generative process is fully adjustable to meet your unique
needs and preferences. Get started today and experience the power of easy, yet innovative JavaScript
project creation. We invite you to take a closer look at our [RPG](examples/rpg) or explore the
other examples in the [examples](examples) folder to witness the full extent of our program's
capabilities.

### Changelog

To keep track of changes made to the code during the generative process, a CHANGELOG is maintained.
Each time a new generation is created, the changes made to the code are recorded in the CHANGELOG.

### Evolution

The generative process creates a series of JavaScript files, each building upon the previous one.
The process is driven by the OpenAI GPT-3.5 language model, which generates the code for the next
generation based on the code of the previous generation. The evolve function defined in the base.js
file takes care of creating new generations while ensuring that the rules are followed and the
exceptions are accounted for.

### Conclusion

The generative process implemented by the JavaScript files base.js and generation-000.js utilizes
OpenAI's GPT-3.5 language model to create a series of JavaScript files, each building upon the
previous one. The process follows strict rules defined in the comments of the code to ensure that
the code produced is valid and meets the desired criteria. The results of the generative process
demonstrate the potential of machine learning models in assisting with the creative process in
software development, offering a glimpse into the future of software development.

### Acknowledgements

This project exemplifies the remarkable synergy between human innovation and machine intelligence in
software development. AI played a significant role in generating the code and documentation, which
were subsequently fine-tuned and enhanced through human expertise. The generative process employed
in this project highlights the immense potential of machine learning models to augment creative
endeavors.

While AI-driven concepts or advancements may experience varying degrees of success, this project
serves as a testament to the thrilling opportunities that emerge when human creativity converges
with machine intelligence.

### Caution

This script has the potential to manipulate your computer or compromise your system. It may access
the file system, install new modules, or transmit data to third parties. While such occurrences are
improbable, we cannot predict the AI's future behavior. You, as the user, are responsible for
moderating the script's actions.

<img src="assets/example-08.png" alt="example-08.png" width="296"/>

During the iterative process of script development, we observed unexpected and noteworthy events. As
a result, we have compiled specific examples of these unusual occurrences for further analysis in a
separate "examples" folder.

While examining [generation-002.js](examples/password-protecting-itself/generation-002.js) and
[generation-003.js](examples/password-protecting-itself/generation-003.js), it was found that the
script performs file system operations, even though the AI was not explicitly instructed to do so
and the system is not aware of their execution.

Files created:

- [generation_2.txt](examples/password-protecting-itself/generation_2.txt)
- [generation_3.txt](examples/password-protecting-itself/generation_3.txt)

Upon reviewing [generation-004.js](examples/password-protecting-itself/generation-004.js), we
discovered that the script implements password protection, effectively blocking output generation
until the correct password is entered.

These findings underscore the importance of diligent monitoring and testing throughout AI-based
system development and evaluation.

## Examples

### Calculator

A simple command-line [calculator](examples/calculator) that performs basic arithmetic operations.
Enter the calculation in the format number operator number (e.g. 2 + 2). The result will be
displayed in the console.

### Chatbot

A [chatbot](examples/chatbot) that responds to user input with pre-defined messages. This example is
a good starting point for building your own chatbot. The [chatbot-gpt](examples/chatbot-gpt)
extension allows for integration with OpenAI's GPT models to generate more advanced and realistic
responses.

### Mandelbrot

A console-based application that generates a Mandelbrot fractal and outputs it as ASCII art in a 90
columns \* 30 rows grid. The mandelbrot-config example allows for the customization of the fractal
parameters.

**Examples:**

- [mandelbrot-config](examples/mandelbrot-config)
- [mandelbrot-moving](examples/mandelbrot-moving)
- [mandelbrot-zoom](examples/mandelbrot-zoom)

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

### Password Protecting Itself

An example that demonstrates how to create a
[password-protected](examples/password-protecting-itself) script. When the script is run, it prompts
the user for a password. If the correct password is entered, the script will execute. Otherwise, it
will terminate.

### React App Form

An example that demonstrates how to build a [React app](examples/react-app-form) by allowing the
script to execute CLI commands. This example creates a form component in a React app using the
create-react-app CLI.

### RPG

An example of a text-based [role-playing gme](examples/rpg) that takes place in a dungeon. Players
navigate through the dungeon and encounter monsters, traps, and treasure. The game includes combat
mechanics and a simple inventory system.

### Search Engine

A console-based [search engine](examples/search-engine) that utilizes Bing to fetch real search
results. Users can enter a search query and the top results will be displayed in the console. Users
can also choose to open the results in their default browser.

### Links

Each of these examples showcases the endless possibilities of what can be created with this
generative process, powered by OpenAI's GPT-3.5 language model.

- [chatbot](examples/chatbot)
- [chatbot-gpt](examples/chatbot-gpt)
- [mandelbrot-config](examples/mandelbrot-config)
- [mandelbrot-moving](examples/mandelbrot-moving)
- [mandelbrot-zoom](examples/mandelbrot-zoom)
- [password-protecting-itself](examples/password-protecting-itself)
- [react-app-form](examples/react-app-form)
- [rpg](examples/rpg)
- [search-engine](examples/search-engine)
