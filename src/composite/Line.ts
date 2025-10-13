import type { DocumentElement } from "./DocumentElement";
import { Word } from "./Word";

export class Line implements DocumentElement {
  private words: Word[] = [];

  add(element: DocumentElement): void {
    this.words.push(element as Word);
  }

  getText(): string {
    return this.words.map(w => w.getText()).join("");
  }

  getWordCount(): number {
    return this.words.reduce((sum, w) => sum + w.getWordCount(), 0);
  }

  getPageCount(): number {
    return 0;
  }

  insertChar(char: string): void {
    if (this.words.length === 0 || /\s/.test(char)) {
      this.words.push(new Word(char));
    } else {
      const last = this.words[this.words.length - 1];
      last.setText(last.getText() + char);
    }
  }

  deleteLastChar(): void {
    const last = this.words[this.words.length - 1];
    if (!last) return;
    const text = last.getText().slice(0, -1);
    if (text.length === 0) this.words.pop();
    else last.setText(text);
  }
}
