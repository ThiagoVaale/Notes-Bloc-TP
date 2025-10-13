import { Page } from "./Page";

export class Document {
  private pages: Page[];

  constructor() {
    this.pages = [new Page()];
  }

  getCurrentPage(): Page {
    return this.pages[this.pages.length - 1];
  }

  getText(): string {
    return this.pages.map(p => p.getText()).join("\n--- PAGE BREAK ---\n");
  }

  getWordCount(): number {
    return this.pages.reduce((sum, p) => sum + p.getWordCount(), 0);
  }

  getPageCount(): number {
    return this.pages.length;
  }

  insertChar(char: string): void {
    this.getCurrentPage().insertChar(char);
  }

  deleteChar(): void {
    this.getCurrentPage().deleteChar();
  }
}
