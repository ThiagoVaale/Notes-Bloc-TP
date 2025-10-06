import type { DocumentElement } from './DocumentElement';
import { Page } from './Page';

export class Document implements DocumentElement {
  protected readonly children: Page[] = [];

  public add(child: DocumentElement): void {
    if (child instanceof Page) {
      this.children.push(child);
    } else {
      throw new Error('A Document can only contain Page elements.');
    }
  }

  public getContent(): string {
    const pageSeparator = '\n\n===== FIN DE PÁGINA =====\n\n';
    return this.children.map(child => child.getContent()).join(pageSeparator);
  }

  public countWords(): number {
    return this.children.reduce((sum, child) => sum + child.countWords(), 0);
  }

  public countPages(): number {
    return this.children.reduce((sum, child) => sum + child.countPages(), 0);
  }
}