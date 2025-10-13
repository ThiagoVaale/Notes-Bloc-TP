import type { DocumentElement } from "./DocumentElement";
import { Line } from "./Line";
import { Word } from "./Word";

export class Paragraph implements DocumentElement {
  private lines: Line[] = [new Line()];

  add(element: DocumentElement): void {
    this.lines.push(element as Line);
  }

  getText(): string {
    return this.lines.map(l => l.getText()).join("\n");
  }

  getWordCount(): number {
    return this.lines.reduce((sum, l) => sum + l.getWordCount(), 0);
  }

  getPageCount(): number {
    return 0;
  }

  insertChar(char: string): void {
    this.lines[this.lines.length - 1].insertChar(char);
  }

  deleteChar(): void {
    this.lines[this.lines.length - 1].deleteLastChar();
  }

  setText(value: string): void {
    this.lines = [new Line()];
    const words = value.split(/(\s+)/);
    words.forEach(w => this.lines[0].add(new Word(w)));
  }
}
