import type { DocumentElement } from "./DocumentElement";
import { Line } from "./Line";

export class Paragraph implements DocumentElement {
  protected readonly children: Line[] = [];

  add(child: DocumentElement): void {
    if (child instanceof Line) {
      this.children.push(child);
    } else {
      throw new Error("A Paragraph can only contain Line elements.");
    }
  }

  getContent(): string {
    return this.children.map(c => c.getContent()).join("\n");
  }

  countWords(): number {
    return this.children.reduce((s, c) => s + c.countWords(), 0);
  }

  countPages(): number {
    return 0;
  }

  /** 🔧 agregado para comandos */
  getLastChild(): DocumentElement | null {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }

  /** 🔧 agregado */
  removeLastWord(): DocumentElement | null {
    const last = this.getLastChild() as Line | null;
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
