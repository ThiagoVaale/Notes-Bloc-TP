
export interface DocumentElement {

  add(child: DocumentElement): void;


  getContent(): string;

  countWords(): number;

  countPages(): number;
  getLastChild?(): DocumentElement | null;
  removeLastWord?(): DocumentElement | null;
  isEmpty?(): boolean
}