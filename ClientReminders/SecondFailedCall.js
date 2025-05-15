const Handlebars = require("handlebars");
const fs = require("node:fs");
const path = require("node:path");
const chokidar = require("chokidar");

// activate all helper functions
registerHelpers();

const emailMessage = ``;

const data = {};

const template = Handlebars.compile(emailMessage);

function generateAndSaveHTML() {
  try {
    console.log("Generating HTML...");
    const html = template(data);

    const outputFile = path.join(__dirname, "second_failed_call.html");
    fs.writeFileSync(outputFile, html);
    console.log(`HTML generated successfully at: ${outputFile}`);
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

console.log("Setting up file watcher with chokidar...");

// Watch JS files
const watcher = chokidar.watch(["./ClientReminders/*.js"], {
  ignored: /(node_modules|\.git)/,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
});

// Add event listeners
watcher
  .on("change", (path) => {
    console.log(`File ${path} has changed, regenerating HTML...`);
    generateAndSaveHTML();
  })
  .on("error", (error) => console.error(`Watcher error: ${error}`))
  .on("ready", () =>
    console.log("Initial scan complete. Ready for changes...")
  );

// Initial generation
console.log("Performing initial HTML generation...");
generateAndSaveHTML();
