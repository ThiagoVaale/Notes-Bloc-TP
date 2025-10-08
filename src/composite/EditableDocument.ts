import type { DocumentElement } from "../composite/DocumentElement";

export interface EditableDocument extends DocumentElement {
  removeLastWord(): DocumentElement | null;
  ensureWritableTail(): { line: { add: (child: DocumentElement) => void } };
}


