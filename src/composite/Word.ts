import type { DocumentElement } from './DocumentElement';

export class Word implements DocumentElement {
  private readonly content: string;

  constructor(content: string) {
    this.content = content;
  }

  public add(): void {
    throw new Error("Cannot add child to a Word. It's a leaf element.");
  }

  public getContent(): string {
    return this.content;
  }

  public countWords(): number {
    return 1;
  }

  public countPages(): number {
    return 0;
  }
}