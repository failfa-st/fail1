# Fail 1

**Please respect the [LICENSE](LICENSE) of this project (AGPL-3.0)**

> This project is built to fail  
> (until it doesn't)

<!-- toc -->

- [Overview](#overview)
- [Getting Started Guide](#getting-started-guide)
  * [1. Prerequisites](#1-prerequisites)
  * [2. Clone the repository](#2-clone-the-repository)
  * [3. Install dependencies](#3-install-dependencies)
  * [4. Add your API key](#4-add-your-api-key)
- [Usage](#usage)
- [Options](#options)
- [Functionality](#functionality)

<!-- tocstop -->

## Overview

This project aims to generate code using the OpenAI API in an evolutionary way. It means that each
generation will build upon the previous one to make the code better, extend it, refactor it or fix
bugs.

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

## Usage

To start the code generation process, run the following command:

```shell
node generation-000.js -G "<goal>" -g <generations> -p "<persona>" -t <temperature> -c -m "<model>"
```

## Options

| Option          | Alias | Type      | Default                                                                    | Description                                                       |
| --------------- | ----- | --------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `--goal`        | `-G`  | `string`  | `"extend the code"`                                                        | Sets the goal of the generated code                               |
| `--generations` | `-g`  | `number`  | `1`                                                                        | Sets the number of generations for the generated code             |
| `--persona`     | `-p`  | `string`  | `"expert node.js developer, creative, code optimizer, interaction expert"` | Sets the persona of the generated code                            |
| `--temperature` | `-t`  | `number`  | `0.2`                                                                      | Sets the temperature for the generated code                       |
| `--clean`       | `-c`  | `boolean` | `false`                                                                    | Set to `true` if you want to remove any previously generated code |
| `--model`       | `-m`  | `string`  | `"gpt-3.5-turbo"`                                                          | Sets the model to use for generating the code                     |

## Functionality

This project generates code using the OpenAI API and follows a set of instructions and constraints
to produce code that can be extended, refactored or fixed. Each generation of code builds upon the
previous one and aims to improve the code. The project uses different personas to generate code, and
a specified number of generations of code can be generated. The generated code is formatted using
prettier and saved in separate files. The project also keeps track of changes and provides a
changelog. Additionally, it can remove previously generated code. The project can handle errors and
can retry code generation in case of an error.

The project has two files:

- `base.js`: This file controls how the code is generated using the OpenAI API.
- `generation-000.js`: This file is the starting point for the code generation process. It sets
  everything in motion for generating code.
