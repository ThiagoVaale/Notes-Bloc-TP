import type { DocumentElement } from "./DocumentElement";
import { Paragraph } from "./Paragraph";

export class Page implements DocumentElement {
  protected readonly children: Paragraph[] = [];

  add(child: DocumentElement): void {
    if (child instanceof Paragraph) {
      this.children.push(child);
    } else {
      throw new Error("A Page can only contain Paragraph elements.");
    }
  }

  getContent(): string {
    return this.children.map(c => c.getContent()).join("\n\n");
  }

  countWords(): number {
    return this.children.reduce((s, c) => s + c.countWords(), 0);
  }

  countPages(): number {
    return 1 + this.children.reduce((s, c) => s + c.countPages(), 0);
  }

  /** 🔧 agregado */
  getLastChild(): DocumentElement | null {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }

  /** 🔧 agregado */
  removeLastWord(): DocumentElement | null {
    const last = this.getLastChild() as Paragraph | null;
    if (!last) return null;
    const removed = last.removeLastWord?.() ?? null;
    if (last.isEmpty?.()) this.children.pop();
    return removed;
  }

  /** 🔧 agregado */
  isEmpty(): boolean {
    return this.children.length === 0;
  }
}
