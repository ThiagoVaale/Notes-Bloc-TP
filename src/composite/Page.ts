import type { DocumentElement } from './DocumentElement';
import { Paragraph } from './Paragraph';


export class Page implements DocumentElement {
  protected readonly children: Paragraph[] = [];

  public add(child: DocumentElement): void {
    if (child instanceof Paragraph) {
      this.children.push(child);
    } else {
      throw new Error('A Page can only contain Paragraph elements.');
    }
  }

  public getContent(): string {
    return this.children.map(child => child.getContent()).join('\n\n');
  }

  public countWords(): number {
    return this.children.reduce((sum, child) => sum + child.countWords(), 0);
  }

  public countPages(): number {
    return 1 + this.children.reduce((sum, child) => sum + child.countPages(), 0);
  }
}