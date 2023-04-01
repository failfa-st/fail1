/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add Bing search functionality
 * Generation 2: add search result filtering by domain
 * Generation 3: add option to open search result in browser
 * Generation 4: add option to save search results to a file
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import { URL } from "url";
import https from "https";
import { JSDOM } from "jsdom";
import cheerio from "cheerio";
import dotenv from "dotenv";
import open from "open";
import fs from "fs";

dotenv.config();

const generation = 4;

async function search(query, domain) {
  const bingUrl = new URL("https://www.bing.com/search");
  bingUrl.searchParams.set("q", query);
  const html = await new Promise((resolve, reject) => {
    https.get(bingUrl, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });
  const dom = new JSDOM(html);
  const $ = cheerio.load(dom.window.document.body.innerHTML);
  const results = [];
  $("li.b_algo h2 a").each((i, el) => {
    const url = $(el).attr("href");
    if (domain && !url.includes(domain)) {
      return;
    }
    results.push({
      title: $(el).text(),
      url,
    });
  });
  return results;
}

async function output() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter search query: ", async (query) => {
    rl.close();
    console.log(`Searching for "${query}"...`);
    const domain = process.env.DOMAIN;
    const results = await search(query, domain);
    console.log(`Found ${results.length} results:`);
    results.forEach((result, i) => {
      console.log(`${i + 1}. ${result.title}`);
      console.log(`   ${result.url}`);
    });
    const openResult = await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("Enter result number to open (0 to skip): ", (num) => {
        rl.close();
        resolve(num);
      });
    });
    if (openResult > 0 && openResult <= results.length) {
      await open(results[openResult - 1].url);
    }
    const saveResult = await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("Save results to file? (y/n): ", (answer) => {
        rl.close();
        resolve(answer);
      });
    });
    if (saveResult.toLowerCase() === "y") {
      const fileName = `${query.replace(/\s+/g, "-").toLowerCase()}.json`;
      fs.writeFile(fileName, JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log(`Results saved to ${fileName}`);
      });
    }
  });
}

if (generation < generations) {
  try {
    await evolve(generation);
  } catch (error) {
    console.error(error);
  }
} else {
  await output();
}