import type { DocumentElement } from "../composite/DocumentElement";
import type { EditableDocument } from "../composite/EditableDocument";
import type { Command } from "./Command";


export class DeleteWordCommand implements Command {
  private doc: EditableDocument;
  private removed: DocumentElement | null = null;

  constructor(doc: EditableDocument) {
    this.doc = doc;
  }

  execute(): void {
    this.removed = this.doc.removeLastWord();
  }

  undo(): void {
    if (this.removed) {
      // reinsertamos al final (línea actual)
      const { line } = this.doc.ensureWritableTail();
      line.add(this.removed);
      this.removed = null;
    }
  }
}
