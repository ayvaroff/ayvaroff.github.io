import type CV_CONTENT from "../content/content.ts";
import { PdfRenderer, type RenderTextOptions } from "./pdf-renderer.ts";

const FONT_FAMILY = "calibri";
const FONT_NORMAL = `${FONT_FAMILY}-normal`;
const FONT_BOLD = `${FONT_FAMILY}-bold`;

const PAGE_MARGIN = 13; // Margin in millimeters

const COLOR_BLACK = "#000000";
const COLOR_INDIGO_DYE = "#284b63";
const COLOR_JET = "#353535";

const DEFAULT_FONT_SIZE_OPTION = { fontSize: 11 };
const SECTION_TITLE_FONT_OPTIONS = {
  fontStyle: "bold",
  fontSize: 14,
  color: COLOR_INDIGO_DYE,
} satisfies RenderTextOptions;

export async function generatePdfDocument(content: typeof CV_CONTENT): Promise<ArrayBuffer> {
  // First, download font and covert it to base64
  // let's hope this repository won't be changed or deleted
  const calibriNormalFontUrl = "https://github.com/dev-ext/font-face/raw/refs/heads/master/@fontface-other/calibri/calibri.ttf";
  const calibriBoldFontUrl = "https://github.com/dev-ext/font-face/raw/refs/heads/master/@fontface-other/calibri-bold/calibrib.ttf";
  let base64FontNormal: string | undefined;
  let base64FontBold: string | undefined;

  try {
    const responseNormal = await fetch(calibriNormalFontUrl);
    const responseBold = await fetch(calibriBoldFontUrl);

    const fontBufferNormal = await responseNormal.arrayBuffer();
    const fontBufferBold = await responseBold.arrayBuffer();

    base64FontNormal = Buffer.from(fontBufferNormal).toString("base64");
    base64FontBold = Buffer.from(fontBufferBold).toString("base64");
  } catch (error) {
    console.error("Error fetching font:", error);
    // TODO: maybe default to default font
    throw new Error("Failed to load font. Please check the font URL.");
  }

  const pdfRenderer = new PdfRenderer({
    marginHorizontal: PAGE_MARGIN,
    marginVertical: PAGE_MARGIN,
  });

  // Set custom fonts
  pdfRenderer.doc.addFileToVFS(FONT_NORMAL, base64FontNormal).addFont(FONT_NORMAL, FONT_FAMILY, "normal");
  pdfRenderer.doc.addFileToVFS(FONT_BOLD, base64FontBold).addFont(FONT_BOLD, FONT_FAMILY, "bold");
  pdfRenderer.setFontFamily(FONT_FAMILY).doc.setFontSize(DEFAULT_FONT_SIZE_OPTION.fontSize).setLineHeightFactor(1.2);

  renderContactsAndSkills(pdfRenderer, content);
  renderMainContent(pdfRenderer, content);

  // Set metadata
  pdfRenderer.doc
    .setLanguage("en")
    .setCreationDate(new Date())
    .setDocumentProperties({
      title: `${content.full_name}"s CV`,
      author: content.full_name,
    });

  // And save
  return await pdfRenderer.doc.output("arraybuffer");
}

function renderMainContent(pdfRenderer: PdfRenderer, content: typeof CV_CONTENT) {
  const pageWidth = pdfRenderer.getPageContentWidth();

  // Render section title
  pdfRenderer
    .moveToTheNextLine()
    .renderText("About Me", SECTION_TITLE_FONT_OPTIONS)
    // Render summary
    .moveToTheNextLine()
    .renderText(pdfRenderer.doc.splitTextToSize(content.summary, pageWidth, DEFAULT_FONT_SIZE_OPTION), {
      ...DEFAULT_FONT_SIZE_OPTION,
      fontStyle: "normal",
      color: COLOR_JET,
    })
    // Render section title
    .moveToTheNextLine(2)
    .renderText("Experience", SECTION_TITLE_FONT_OPTIONS)
    .moveToTheNextLine();

  // Render experience
  content.experience.forEach((experience) => {
    const stackTitle = "Stack: ";
    const stackTitleWidth = pdfRenderer.doc.getTextWidth(stackTitle);

    pdfRenderer
      .renderText(`${experience.company} - ${experience.title}`, {
        fontStyle: "bold",
        fontSize: 11,
        color: COLOR_BLACK,
      })
      .moveToTheNextLine()
      .renderText(experience.dates, {
        fontStyle: "normal",
        fontSize: 10,
        color: COLOR_JET,
      })
      .moveToTheNextLine(2)
      .renderText(pdfRenderer.doc.splitTextToSize(experience.description.trim(), pageWidth, DEFAULT_FONT_SIZE_OPTION), DEFAULT_FONT_SIZE_OPTION)
      .moveToTheNextLine()
      .renderText(stackTitle, { fontStyle: "bold" })
      .renderText(pdfRenderer.doc.splitTextToSize(experience.stack.join(" | "), pageWidth - stackTitleWidth), { fontStyle: "normal" })
      .moveToTheNextLine(2);
  });

  // Render section title
  pdfRenderer
    .moveToTheNextLine()
    .renderText("Education", SECTION_TITLE_FONT_OPTIONS)
    .moveToTheNextLine();

  // Render education
  content.education.forEach((education) => {
    pdfRenderer
      .renderText(education.name, {
        fontStyle: "bold",
        fontSize: 11,
        color: COLOR_BLACK,
      })
      .moveToTheNextLine()
      .renderText(education.degree, {
        fontStyle: "normal",
        fontSize: 10,
        color: COLOR_JET,
      })
      .moveToTheNextLine()
      .renderText(education.dates, {
        fontStyle: "normal",
        fontSize: 10,
        color: COLOR_JET,
      })
      .moveToTheNextLine(2)
      .renderText(pdfRenderer.doc.splitTextToSize(education.description.trim(), pageWidth, DEFAULT_FONT_SIZE_OPTION), DEFAULT_FONT_SIZE_OPTION)
      .moveToTheNextLine(2);
  });
}

function renderContactsAndSkills(pdfRenderer: PdfRenderer, content: typeof CV_CONTENT) {
  const pageWidth = pdfRenderer.getPageContentWidth();

  // Render name
  pdfRenderer
    .moveToTheNextLine()
    .renderText(content.full_name, {
      fontStyle: "bold",
      fontSize: 18,
      color: COLOR_BLACK,
    })
    // Render title
    .renderText(` - ${content.title}`, {
      fontStyle: "normal",
      color: COLOR_JET,
    })
    .moveToTheNextLine()
    // Render email
    .renderText("Email: ", {
      ...DEFAULT_FONT_SIZE_OPTION,
      fontStyle: "bold",
      color: COLOR_BLACK,
    })
    .renderText(content.contacts.email);

  // Render social media links
  content.social.forEach((social) => {
    pdfRenderer
      .moveToTheNextLine()
      .renderText(`${social.name}: `)
      .renderTextWithLink(social.url.replace("https://", ""), social.url);
  });

  const skillsTitle = "Skills: ";
  const skillsTitleWidth = pdfRenderer.doc.getTextWidth(skillsTitle);
  const languagesTitle = "Languages: ";
  const languagesTitleWidth = pdfRenderer.doc.getTextWidth(languagesTitle);

  pdfRenderer
    // Render skills
    .moveToTheNextLine(2)
    .renderText(skillsTitle, { fontStyle: "bold" })
    .renderText(pdfRenderer.doc.splitTextToSize(content.skills.join(" | "), pageWidth - skillsTitleWidth), {
      fontStyle: "normal",
      color: COLOR_JET,
    })
    // Render languages
    .moveToTheNextLine()
    .renderText(languagesTitle, { fontStyle: "bold" })
    .renderText(pdfRenderer.doc.splitTextToSize(content.languages.join(" | "), pageWidth - languagesTitleWidth), {
      fontStyle: "normal",
      color: COLOR_JET,
    })
    .moveToTheNextLine();
}
