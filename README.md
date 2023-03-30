# Fail 1

> This project is built to fail  
> (until it doesn't)

## About this project

This project is designed to showcase the power of evolution in generating increasingly sophisticated
code over time. The statement "This project is built to fail (until it doesn't)" refers to the fact
that the initial generations may fail, but through the process of evolution, the code will
ultimately succeed.

The main objective of this project is to create a species of code that understands the concept of
evolution and can produce offspring that are better adapted to their environment. In the case of a
generation failing to produce a successful offspring, the parent will be used to create a new
version in the hopes of producing a successful code generation.

## Basics

The provided code consists of two files, "base.js" and "generation-000.js". The "base.js" file
contains the core logic of the program, while "generation-000.js" is the starting point of the
evolution process.

## Configuration

In "base.js", the program imports the required modules and defines the necessary configuration for
making API calls to OpenAI. It also defines a function "createMessage" that returns a message
template with specific rules to follow for evolving the code. The function "evolve" is responsible
for generating a new code by calling the OpenAI API and writing the generated code to a file with a
specific filename pattern. The program also exports a constant "generations" that defines the
maximum number of evolutions that the program will run.

## Evolution

In "generation-000.js", the program imports the necessary modules and constants from "base.js". It
sets the current generation to 0 and the next generation to 1. The program then reads the code from
the file with the filename that matches the current generation, and passes it to the "evolve"
function along with the next generation number. If the current generation is less than the maximum
number of generations defined in "base.js", the program will generate a new code and continue to the
next generation until the maximum number of generations is reached.

## Rules

The program follows strict rules that must be respected at all times, as outlined in the comments in
both files. The goal is to evolve the code while respecting the rules and without breaking the
existing code. The program uses the OpenAI API to generate new code and write it to files, which are
then imported and executed in subsequent generations.

## Changelog

In "base.js", one of the rules states to "Keep track of changes in the CHANGELOG." This means that
the program should maintain a changelog that tracks all the changes made to the code with each new
generation. The "generation-000.js" file already includes a simple changelog that lists the initial
implementation of the program. The purpose of this rule is to ensure that the program's evolution
can be tracked and managed over time, which can help with debugging and troubleshooting if any
issues arise. By keeping a record of all changes, it is easier to identify when a particular problem
started and what may have caused it.

## Goal

Please note that the GOAL mentioned in "generation-000.js" is an example and can be adjusted as
needed. The program's objective is to continuously evolve the code by generating new versions based
on the existing code, while adhering to the rules set forth in "base.js". The program is designed to
use the OpenAI API to generate new code, which means that it will rely on the AI's own opinions and
capabilities to determine how the code should evolve. The program is not limited to any specific
goal or output, but is intended to develop and improve the code over time. By following the rules
and leveraging the power of the OpenAI API, the program can generate increasingly sophisticated code
with each new generation.
