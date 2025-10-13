export interface DocumentElement {
  add?(element: DocumentElement): void;
  getText(): string;
  getWordCount(): number;
  getPageCount(): number;
}