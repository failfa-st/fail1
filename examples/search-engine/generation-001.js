/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add Bing search functionality
 */

import { generations, evolve } from "./base.js";
import readline from "readline";
import { URL } from "url";
import https from "https";
import { JSDOM } from "jsdom";
import cheerio from "cheerio";

const generation = 1;

async function search(query) {
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
    results.push({
      title: $(el).text(),
      url: $(el).attr("href"),
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
    const results = await search(query);
    console.log(`Found ${results.length} results:`);
    results.forEach((result, i) => {
      console.log(`${i + 1}. ${result.title}`);
      console.log(`   ${result.url}`);
    });
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