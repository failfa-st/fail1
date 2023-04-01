/**
 * CHANGELOG:
 * Generation 0: implement base script
 * Generation 1: add Bing search functionality
 * Generation 2: add search result filtering by domain
 * Generation 3: add option to open search result in browser
 * Generation 4: add option to save search results to a file
 * Generation 5: add option to search multiple pages of results
 * Generation 6: add option to search for images
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

const generation = 6;

async function search(query, domain, pages, isImageSearch) {
  const results = [];
  const searchType = isImageSearch ? "images" : "search";
  for (let i = 0; i < pages; i++) {
    const bingUrl = new URL(`https://www.bing.com/${searchType}`);
    bingUrl.searchParams.set("q", query);
    bingUrl.searchParams.set("first", i * 10 + 1);
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
    const selector = isImageSearch ? "a.iusc" : "li.b_algo h2 a";
    $(selector).each((i, el) => {
      const url = isImageSearch ? $(el).attr("m") : $(el).attr("href");
      if (domain && !url.includes(domain)) {
        return;
      }
      const title = isImageSearch ? $(el).attr("t1") : $(el).text();
      results.push({
        title,
        url,
      });
    });
  }
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
    const pages = process.env.PAGES || 1;
    const isImageSearch = await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("Search for images? (y/n): ", (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === "y");
      });
    });
    const results = await search(query, domain, pages, isImageSearch);
    console.log(`Found ${results.length} ${isImageSearch ? "images" : "results"}:`);
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