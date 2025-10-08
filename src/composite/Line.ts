import type { DocumentElement } from "./DocumentElement";
import { Word } from "./Word";

export class Line implements DocumentElement {
  protected readonly children: Word[] = [];

  add(child: DocumentElement): void {
    if (child instanceof Word) {
      this.children.push(child);
    } else {
      throw new Error("A Line can only contain Word elements.");
    }
  }

  getContent(): string {
    return this.children.map(c => c.getContent()).join(" ");
  }

  countWords(): number {
    return this.children.reduce((s, c) => s + c.countWords(), 0);
  }

  countPages(): number {
    return 0;
  }

  /** 🔧 agregado: para editar desde comandos */
  removeLastWord(): DocumentElement | null {
    return this.children.length > 0 ? this.children.pop() ?? null : null;
  }

  /** 🔧 agregado */
  isEmpty(): boolean {
    return this.children.length === 0;
  }

  /** 🔧 agregado */
  getLastChild(): DocumentElement | null {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
}
