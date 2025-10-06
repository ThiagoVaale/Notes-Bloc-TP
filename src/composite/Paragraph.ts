import type { DocumentElement } from './DocumentElement';
import { Line } from './Line';

/**
 * Clase Composite.
 * Representa un párrafo, que contiene elementos 'Line'.
 */
export class Paragraph implements DocumentElement {
  protected readonly children: Line[] = [];

  public add(child: DocumentElement): void {
    if (child instanceof Line) {
      this.children.push(child);
    } else {
      throw new Error('A Paragraph can only contain Line elements.');
    }
  }

  public getContent(): string {
    // Une el contenido de sus hijos (líneas) con un salto de línea.
    return this.children.map(child => child.getContent()).join('\n');
  }

  public countWords(): number {
    return this.children.reduce((sum, child) => sum + child.countWords(), 0);
  }

  public countPages(): number {
    return this.children.reduce((sum, child) => sum + child.countPages(), 0);
  }
}