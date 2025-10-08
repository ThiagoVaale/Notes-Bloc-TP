import type { DocumentElement } from "./DocumentElement";
import { Page } from "./Page";
import { Paragraph } from "./Paragraph";
import { Line } from "./Line";
import { Word } from "./Word";

export class Document implements DocumentElement {
  protected readonly children: Page[] = [];

  add(child: DocumentElement): void {
    if (child instanceof Page) {
      this.children.push(child);
    } else {
      throw new Error("A Document can only contain Page elements.");
    }
  }

  getContent(): string {
    const pageSeparator = "\n\n===== FIN DE PÁGINA =====\n\n";
    return this.children.map(c => c.getContent()).join(pageSeparator);
  }

  countWords(): number {
    return this.children.reduce((s, c) => s + c.countWords(), 0);
  }

  countPages(): number {
    return this.children.reduce((s, c) => s + c.countPages(), 0);
  }

  /** 🔧 helpers para edición (no rompen su interfaz original) */
  getLastChild(): DocumentElement | null {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }

  /** Crea Page/Paragraph/Line si no existen (para insertar palabras) */
  ensureWritableTail(): { page: Page; paragraph: Paragraph; line: Line } {
    let page = this.getLastChild() as Page | null;
    if (!page) {
      page = new Page();
      this.add(page);
    }
    let paragraph = (page.getLastChild?.() as Paragraph | null) ?? null;
    if (!paragraph) {
      paragraph = new Paragraph();
      page.add(paragraph);
    }
    let line = (paragraph.getLastChild?.() as Line | null) ?? null;
    if (!line) {
      line = new Line();
      paragraph.add(line);
    }
    return { page, paragraph, line };
  }

  /** Inserta una palabra al final (convenience p/ comandos) */
  insertWord(word: Word): void {
    const { line } = this.ensureWritableTail();
    line.add(word);
  }

  /** Elimina la última palabra del documento y devuelve lo removido */
  removeLastWord(): DocumentElement | null {
    const page = this.getLastChild() as Page | null;
    if (!page) return null;
    const removed = page.removeLastWord?.() ?? null;
    if (page.isEmpty?.()) this.children.pop();
    return removed;
  }
}
