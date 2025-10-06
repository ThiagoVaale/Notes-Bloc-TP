import type { DocumentElement } from './DocumentElement';

/**
 * Clase Leaf (Patrón Composite).
 * Representa el objeto final en la jerarquía: una sola palabra.
 * No puede tener hijos.
 */
export class Word implements DocumentElement {
  // Usamos 'private readonly' para asegurar que la palabra no cambie una vez creada.
  private readonly content: string;

  constructor(content: string) {
    this.content = content;
  }

  public add(child: DocumentElement): void {
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