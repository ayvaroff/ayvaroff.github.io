import { jsPDF } from "jspdf";

const PT_TO_MM = 25.4 / 72; // Conversion factor from points to millimeters

export type RenderTextOptions = {
  fontStyle?: "normal" | "bold" | "italic";
  fontSize?: number;
  color?: string; // Hex color code
};

interface PdfRendererOptions {
  orientation: "p" | "l"; // Portrait or Landscape
  marginHorizontal: number; // Horizontal margin in mm
  marginVertical: number; // Vertical margin in mm
  initialCursorX?: number; // Initial X position in mm
  initialCursorY?: number; // Initial Y position in mm
}

const DEFAULT_OPTIONS: PdfRendererOptions = {
  orientation: "p",
  marginHorizontal: 20, // Default horizontal margin in mm
  marginVertical: 20, // Default vertical margin in mm
};

/**
 * PdfRenderer is a utility class for tracking the current drawing position in a jsPDF document.
 * It maintains the X and Y coordinates, allowing consistent placement of text and elements.
 */
export class PdfRenderer {
  public doc: jsPDF;
  private fontFamily: string = "Helvetica"; // Built-in default font
  private _cursorX: number;
  private _cursorY: number;
  // Initial cursor positions, used for resetting the cursor or using the values when user determines custom cursor positions
  private _initialCursorX: number;
  private _initialCursorY: number;
  private options: PdfRendererOptions = DEFAULT_OPTIONS;

  constructor(options?: Partial<PdfRendererOptions>) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.doc = new jsPDF({
      orientation: this.options.orientation,
      unit: "mm", // All "magic" numbers are going to be in millimeters
      format: "a4",
      putOnlyUsedFonts: true,
    });
    this._cursorX = this._initialCursorX = this.options.initialCursorX || this.options.marginHorizontal;
    this._cursorY = this._initialCursorY = this.options.initialCursorY || this.options.marginVertical;
  }

  get cursorX(): number {
    return this._cursorX;
  }

  set cursorX(value: number) {
    this._cursorX = value;
    this._initialCursorX = value; // Update initial cursor X position when set by the user
  }

  get cursorY(): number {
    return this._cursorY;
  }

  set cursorY(value: number) {
    this._cursorY = value;
    this._initialCursorY = value; // Update initial cursor Y position when set by the user
  }

  public addPage() {
    this.doc.addPage();
    this.resetCursor();
    return this;
  }

  public resetCursor() {
    this._cursorX = this._initialCursorX;
    this._cursorY = this._initialCursorY;
    return this;
  }

  public setFontFamily(fontFamily: string) {
    this.fontFamily = fontFamily;
    return this;
  }

  public renderText(text: string, options?: RenderTextOptions): PdfRenderer {
    // only apply options if they are provided, otherwise previous settings will be used
    if (options?.fontSize) {
      this.doc.setFontSize(options.fontSize);
    }
    if (options?.fontStyle) {
      this.doc.setFont(this.fontFamily, options.fontStyle);
    }
    if (options?.color) {
      this.doc.setTextColor(options.color);
    }

    this.doc.text(text, this._cursorX, this._cursorY);

    // Update the x and y position to the end of the rendered text
    const textDimensions = this.doc.getTextDimensions(text);
    this._cursorX += textDimensions.w;
    this._cursorY += textDimensions.h - this.doc.getFontSize() * PT_TO_MM;
    return this;
  }

  public moveToTheNextLine(lines = 1, lineHeight?: number): PdfRenderer {
    const lineHeightToUse = lineHeight || this.doc.getLineHeight();
    // Increment y position by the line height in mm
    this._cursorX = this._initialCursorX; // Reset x position to margin
    this._cursorY += lines * lineHeightToUse * this.doc.getLineHeightFactor() * PT_TO_MM;

    //check if the cursorY exceeds the page height, if so, add a new page
    if (this._cursorY > this.doc.internal.pageSize.getHeight() - this.options.marginVertical) {
      this.doc.addPage();
      this.resetCursor();
    }
    return this;
  }
}
