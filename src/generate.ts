import fs from "fs";
import path from "path";
import nunjucks from "nunjucks";

import cv from "./content/content.ts";
import icons from "./content/icons.ts";
import { generatePdfDocument } from "./pdf/pdf.ts";

const TEMPLATES_DIRECTORY = "templates";
const MAIN_TEMPLATE = "main.njk";
const OUTPUT_DIRECTORY = "docs";
const OUTPUT_DOCUMENT = path.join(OUTPUT_DIRECTORY, "index.html");
const OUTPUT_PDF = path.join(OUTPUT_DIRECTORY, "CV.pdf");

generateDocument()
  .then(() => {
    console.log("✅ Document generated successfully.");
  })
  .catch((error) => {
    console.error("❌ Error generating document:", error);
  });

async function generateDocument() {
  nunjucks.configure(TEMPLATES_DIRECTORY, { autoescape: true });
  const content = nunjucks.render(MAIN_TEMPLATE, { ...cv, icons_svg: icons });

  // web version
  await fs.promises.writeFile(OUTPUT_DOCUMENT, content, "utf-8");
  // pdf version
  await generatePdfDocument(OUTPUT_PDF, cv);
}
