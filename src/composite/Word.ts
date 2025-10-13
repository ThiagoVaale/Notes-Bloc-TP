import type { DocumentElement } from "./DocumentElement";

export class Word implements DocumentElement {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  setText(value: string): void {
    this.text = value;
  }

  getWordCount(): number {
    return this.text.trim() ? 1 : 0;
  }

  getPageCount(): number {
    return 0;
  }
}
