import { Document } from "../composite/Document";
import type { Command } from "./Command";

export class DeleteCommand implements Command {
  private document: Document;
  private deletedChar: string | null = null;

  constructor(document: Document) {
    this.document = document;
  }

  execute(): void {
    const currentText = this.document.getText();
    if (currentText.length === 0) return;
    this.deletedChar = currentText.slice(-1);
    this.document.deleteChar();
  }

  undo(): void {
    if (this.deletedChar) {
      this.document.insertChar(this.deletedChar);
      this.deletedChar = null;
    }
  }
}
