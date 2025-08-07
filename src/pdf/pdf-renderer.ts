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
  public cursor: Cursor;

  private fontFamily: string = "Helvetica"; // Built-in default font
  private options: PdfRendererOptions = DEFAULT_OPTIONS;

  constructor(options?: Partial<PdfRendererOptions>) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.doc = new jsPDF({
      orientation: this.options.orientation,
      unit: "mm", // All "magic" numbers are going to be in millimeters
      format: "a4",
      putOnlyUsedFonts: true,
    });

    this.cursor = new Cursor({
      initialX: this.options.initialCursorX || this.options.marginHorizontal,
      initialY: this.options.initialCursorY || this.options.marginVertical,
    });
  }

  public addPage() {
    this.doc.addPage();
    this.cursor.reset();
    return this;
  }

  public setFontFamily(fontFamily: string) {
    this.fontFamily = fontFamily;
    return this;
  }

  public renderTextWithLink(text: string, url: string, options?: RenderTextOptions): PdfRenderer {
    this.applyTextOptions(options);
    this.doc.textWithLink(text, this.cursor.x, this.cursor.y, { url, ...options });
    this.updateCursorPositionAfterText(text);
    return this;
  };

  public renderText(text: string, options?: RenderTextOptions): PdfRenderer {
    this.applyTextOptions(options);
    this.doc.text(text, this.cursor.x, this.cursor.y);
    this.updateCursorPositionAfterText(text);
    return this;
  }

  public moveToTheNextLine(lines = 1, lineHeight?: number): PdfRenderer {
    const lineHeightToUse = lineHeight || this.doc.getLineHeight();
    // Increment y position by the line height in mm
    this.cursor.resetX(); // Reset x position to margin
    this.cursor.y += lines * lineHeightToUse * this.doc.getLineHeightFactor() * PT_TO_MM;

    //check if the cursorY exceeds the page height, if so, add a new page
    if (this.cursor.y > this.doc.internal.pageSize.getHeight() - this.options.marginVertical) {
      this.addPage();
    }
    return this;
  }

  public getPageContentWidth(): number {
    const pageWidth = this.doc.internal.pageSize.getWidth();
    const usableWidth = pageWidth - this.options.marginHorizontal * 2;
    return usableWidth;
  }

  private applyTextOptions(options?: RenderTextOptions) {
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
  }

  private updateCursorPositionAfterText(text: string) {
    const textDimensions = this.doc.getTextDimensions(text);
    this.cursor.x += textDimensions.w;
    this.cursor.y += textDimensions.h - this.doc.getFontSize() * PT_TO_MM;
  }
}

class Cursor {
  private _x: number;
  private _y: number;
  // Initial cursor positions is used for resetting the cursor
  // or using the values when user determines custom cursor positions
  private _initialX: number;
  private _initialY: number;

  constructor({ initialX, initialY }: { initialX: number; initialY: number; }) {
    this._x = this._initialX = initialX;
    this._y = this._initialY = initialY;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    // this._initialX = value; // Update initial X position when set by the user
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    // this._initialY = value; // Update initial Y position when set by the user
  }

  public reset() {
    this._x = this._initialX;
    this._y = this._initialY;
  }

  public resetX() {
    this._x = this._initialX;
  }

  public resetY() {
    this._y = this._initialY;
  }
}
