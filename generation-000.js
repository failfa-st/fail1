import fs from "fs/promises";

const generations = 10;
const generation = 0;

if (generation < generations) {
	const filename = `generation-${generation.toString().padStart(3, "0")}.js`;
	let content = await fs.readFile(filename, "utf-8");
	content = content.replace(/generation = (\d+)/, `generation = ${generation + 1}`);
	const nextFilename = `generation-${(generation + 1).toString().padStart(3, "0")}.js`;

	try {
		await fs.writeFile(nextFilename, content);
		console.log("File created and written to successfully!");
		try {
			await import(`./${nextFilename}`);
		} catch (error) {
			console.error(error);
		}
	} catch (error) {
		console.error(error);
	}
}
