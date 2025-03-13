import fs from "fs";
import path from "path";
import { load } from "cheerio";

// DIRECTORIES
const rootDir = process.cwd();
const gasDir = path.join(rootDir, "gas");
const distDir = gasDir; // WE USE THE "gas" DIRECTORY
const assetsDir = path.join(distDir, "assets");

// MAKE SURE THE "gas" DIRECTORY EXISTS
if (!fs.existsSync(gasDir)) {
  fs.mkdirSync(gasDir);
  console.log("Created gas directory.");
}

// FUNCTION TO FIND THE LATEST FILE WITH A GIVEN EXTENSION IN A DIRECTORY
const findLatestFile = (dir, ext) => {
  const files = fs.readdirSync(dir);
  const latestFile = files.filter((file) => file.endsWith(ext)).sort().pop();
  return latestFile ? path.join(dir, latestFile) : null;
};

const jsFile = findLatestFile(assetsDir, ".js");
const cssFile = findLatestFile(assetsDir, ".css");

if (!jsFile || !cssFile) {
  console.error("JavaScript or CSS file not found in the assets directory.");
  process.exit(1);
}

const jsContent = fs.readFileSync(jsFile, "utf8");
const cssContent = fs.readFileSync(cssFile, "utf8");

// GENERATE INLINE FILES IN THE GAS DIRECTORY
const jsHtmlPath = path.join(gasDir, "js.html");
const cssHtmlPath = path.join(gasDir, "css.html");

fs.writeFileSync(jsHtmlPath, `<script>${jsContent}</script>`);
fs.writeFileSync(cssHtmlPath, `<style>${cssContent}</style>`);
console.log("Created js.html and css.html in the gas directory successfully!");

// PROCESS THE INDEX.HTML TO INSERT THE INCLUDES DYNAMICALLY
const indexHtmlPath = path.join(gasDir, "index.html");

if (fs.existsSync(indexHtmlPath)) {
  let indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

  // LOAD THE HTML WITH CHEERIO WITHOUT CONVERTING ENTITIES AND KEEPING THE FORMAT
  const $ = load(indexHtml, { decodeEntities: false });

  // DELETE THE TAGS THAT LOAD FILES FROM /ASSETS/
  $('link[href^="/assets/"]').remove();
  $('script[src^="/assets/"]').remove();

  // INSERT PLACEHOLDERS IN THE PLACES DESIRED WITH LINE BREAKS
  $("head").append("\n<!-- INCLUDE_CSS_PLACEHOLDER -->\n");
  $("#root").after("\n<!-- INCLUDE_JS_PLACEHOLDER -->\n");

  // OBTAIN THE MODIFIED HTML AS A STRING
  let modifiedHtml = $.html();

  // REPLACE THE PLACEHOLDERS BY THE GAS INCLUDE SYNTAX
  modifiedHtml = modifiedHtml.replace(
    "<!-- INCLUDE_CSS_PLACEHOLDER -->",
    "<?!= includes(\"css.html\"); ?>"
  );
  modifiedHtml = modifiedHtml.replace(
    "<!-- INCLUDE_JS_PLACEHOLDER -->",
    "<?!= includes(\"js.html\"); ?>"
  );

  // DELETE EXTRA LINES (COLLAPSE MULTIPLE LINE BREAKS INTO ONE)
  modifiedHtml = modifiedHtml.replace(/\n\s*\n/g, "\n");

  // OVERWRITE THE INDEX.HTML WITH THE MODIFIED HTML
  fs.writeFileSync(indexHtmlPath, modifiedHtml, "utf8");
  console.log("Modifications in index.html have been applied successfully.");
} else {
  console.warn("index.html not found in the gas directory.");
}
