import type { Command } from "./Command";
import type { Document } from "../composite/Document";
import { Word } from "../composite/Word";

export class InsertWordCommand implements Command {
  private inserted = false;

  // ⛔️ NO usar parameter properties aquí
  private readonly doc: Document;
  private readonly word: Word;

  constructor(doc: Document, word: Word) {
    this.doc = doc;
    this.word = word;
  }

  execute(): void {
    this.doc.insertWord(this.word);
    this.inserted = true;
  }

  undo(): void {
    if (this.inserted) {
      this.doc.removeLastWord?.();
      this.inserted = false;
    }
  }
}
