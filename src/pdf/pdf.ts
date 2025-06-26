import type CV_CONTENT from "../content/content.ts";
import { PdfRenderer, type RenderTextOptions } from "./pdf-renderer.ts";

const FONT_FAMILY = "calibri";
const FONT_NORMAL = `${FONT_FAMILY}-normal`;
const FONT_BOLD = `${FONT_FAMILY}-bold`;

const PAGE_MARGIN = 13; // Margin in millimeters
const PADDING_BETWEEN_COLUMNS = 10; // Padding between columns in millimeters

const COLOR_BLACK = "#000000";
const COLOR_INDIGO_DYE = "#284b63";
const COLOR_JET = "#353535";

const SECTION_TITLE_FONT_OPTIONS = {
  fontStyle: "bold",
  fontSize: 10,
  color: COLOR_INDIGO_DYE,
} satisfies RenderTextOptions;

export async function generatePdfDocument(destination: string, content: typeof CV_CONTENT): Promise<void> {
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
  pdfRenderer.doc.setFont(FONT_FAMILY).setFontSize(10).setLineHeightFactor(1.2);

  renderLeftColumn(pdfRenderer, content);
  renderRightColumn(pdfRenderer, content);

  // Set metadata
  pdfRenderer.doc
    .setLanguage("en")
    .setCreationDate(new Date())
    .setDocumentProperties({
      title: `${content.full_name}"s CV`,
      author: content.full_name,
    });

  // And save
  await pdfRenderer.doc.save(destination, { returnPromise: true });
}

function renderLeftColumn(pdfRenderer: PdfRenderer, content: typeof CV_CONTENT) {
  const pageWidth = pdfRenderer.doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - PAGE_MARGIN * 2 - PADDING_BETWEEN_COLUMNS;
  const leftColWidth = usableWidth * 0.75;

  // Render name
  pdfRenderer
    .moveToTheNextLine()
    .renderText(content.full_name, {
      fontStyle: "bold",
      fontSize: 36,
      color: COLOR_BLACK,
    })
    // Render title
    .moveToTheNextLine(1, 24)
    .renderText(content.title, {
      fontStyle: "normal",
      fontSize: 12,
      color: COLOR_JET,
    })
    // Render section title
    .moveToTheNextLine(2)
    .renderText("About Me", SECTION_TITLE_FONT_OPTIONS)
    // Render summary
    .moveToTheNextLine(2)
    .renderText(pdfRenderer.doc.splitTextToSize(content.summary, leftColWidth, { fontSize: 10 }), {
      fontStyle: "normal",
      color: COLOR_JET,
    })
    // Render section title
    .moveToTheNextLine(3)
    .renderText("Experience", SECTION_TITLE_FONT_OPTIONS)
    .moveToTheNextLine(2);

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
        fontSize: 8,
        color: COLOR_JET,
      })
      .moveToTheNextLine(2)
      .renderText(pdfRenderer.doc.splitTextToSize(experience.description.trim(), leftColWidth, { fontSize: 10 }), {
        fontSize: 10,
      })
      .moveToTheNextLine()
      .renderText(stackTitle, { fontStyle: "bold" })
      .renderText(pdfRenderer.doc.splitTextToSize(experience.stack.join(" | "), leftColWidth - stackTitleWidth), { fontStyle: "normal" })
      .moveToTheNextLine(2);
  });

  // Render section title
  pdfRenderer
    .moveToTheNextLine(2)
    .renderText("Education", SECTION_TITLE_FONT_OPTIONS)
    .moveToTheNextLine(2);

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
        fontSize: 8,
        color: COLOR_JET,
      })
      .moveToTheNextLine()
      .renderText(education.dates, {
        fontStyle: "normal",
        fontSize: 8,
        color: COLOR_JET,
      })
      .moveToTheNextLine(2)
      .renderText(pdfRenderer.doc.splitTextToSize(education.description.trim(), leftColWidth, { fontSize: 10 }), {
        fontSize: 10,
      })
      .moveToTheNextLine(2);
  });

  // Reset cursor position for right column
  pdfRenderer.cursorX = PAGE_MARGIN + leftColWidth + PADDING_BETWEEN_COLUMNS;
  pdfRenderer.cursorY = PAGE_MARGIN;
}

function renderRightColumn(pdfRenderer: PdfRenderer, content: typeof CV_CONTENT) {
  const pageWidth = pdfRenderer.doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - PAGE_MARGIN * 2 - PADDING_BETWEEN_COLUMNS;
  const rightColWidth = usableWidth * 0.25;

  // make sure render happens on the first page
  pdfRenderer.doc.setPage(1);

  pdfRenderer
    // Render email
    .renderText("Email", {
      fontStyle: "bold",
      fontSize: 10,
      color: COLOR_BLACK,
    })
    .moveToTheNextLine()
    .renderText(content.contacts.email);

  // Render social media links
  content.social.forEach((social) => {
    pdfRenderer
      .moveToTheNextLine(2)
      .renderText(social.name)
      .moveToTheNextLine()
      .renderText(social.url.replace("https://", ""));
  });

  pdfRenderer
    // Render skills
    .moveToTheNextLine(3)
    .renderText("Skills", SECTION_TITLE_FONT_OPTIONS)
    .moveToTheNextLine()
    .renderText(pdfRenderer.doc.splitTextToSize(content.skills.join(" | "), rightColWidth), {
      fontStyle: "normal",
      color: COLOR_JET,
    })
    // Render languages
    .moveToTheNextLine(3)
    .renderText("Languages", SECTION_TITLE_FONT_OPTIONS)
    .moveToTheNextLine()
    .renderText(pdfRenderer.doc.splitTextToSize(content.languages.join(" | "), rightColWidth), {
      fontStyle: "normal",
      color: COLOR_JET,
    });
}
