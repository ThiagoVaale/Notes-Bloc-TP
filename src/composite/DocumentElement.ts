
export interface DocumentElement {

  add(child: DocumentElement): void;


  getContent(): string;

  countWords(): number;

  countPages(): number;
}