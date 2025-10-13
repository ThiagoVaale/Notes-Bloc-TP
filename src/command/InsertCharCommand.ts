import { Document } from "../composite/Document";
import type { Command } from "./Command";

export class InsertCharCommand implements Command {
  private document: Document;
  private char: string;

  constructor(document: Document, char: string) {
    this.document = document;
    this.char = char;
  }

  execute(): void {
    this.document.insertChar(this.char);
  }

  undo(): void {
    this.document.deleteChar();
  }
}
