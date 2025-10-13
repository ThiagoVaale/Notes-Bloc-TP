import type { DocumentElement } from "./DocumentElement";
import { Paragraph } from "./Paragraph";

export class Page implements DocumentElement {
  private paragraphs: Paragraph[] = [new Paragraph()];

  getCurrentParagraph(): Paragraph {
    return this.paragraphs[this.paragraphs.length - 1];
  }

  getText(): string {
    return this.paragraphs.map(p => p.getText()).join("\n\n");
  }

  getWordCount(): number {
    return this.paragraphs.reduce((sum, p) => sum + p.getWordCount(), 0);
  }

  getPageCount(): number {
    return 1;
  }

  insertChar(char: string): void {
    this.getCurrentParagraph().insertChar(char);
  }

  deleteChar(): void {
    this.getCurrentParagraph().deleteChar();
  }
}
