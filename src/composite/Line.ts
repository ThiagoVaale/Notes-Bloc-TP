import type { DocumentElement } from './DocumentElement';
import { Word } from './Word'; 


export class Line implements DocumentElement {
  protected readonly children: Word[] = [];

  public add(child: DocumentElement): void {
    if (child instanceof Word) {
      this.children.push(child);
    } else {
      throw new Error('A Line can only contain Word elements.');
    }
  }

  public getContent(): string {

    return this.children.map(child => child.getContent()).join(' ');
  }

  public countWords(): number {
    return this.children.reduce((sum, child) => sum + child.countWords(), 0);
  }

  public countPages(): number {
    return this.children.reduce((sum, child) => sum + child.countPages(), 0);
  }
}