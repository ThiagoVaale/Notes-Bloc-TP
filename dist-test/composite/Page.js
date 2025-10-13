import { Paragraph } from "./Paragraph";
export class Page {
    constructor() {
        this.paragraphs = [new Paragraph()];
    }
    getCurrentParagraph() {
        return this.paragraphs[this.paragraphs.length - 1];
    }
    getText() {
        return this.paragraphs.map(p => p.getText()).join("\n\n");
    }
    getWordCount() {
        return this.paragraphs.reduce((sum, p) => sum + p.getWordCount(), 0);
    }
    getPageCount() {
        return 1;
    }
    insertChar(char) {
        this.getCurrentParagraph().insertChar(char);
    }
    deleteChar() {
        this.getCurrentParagraph().deleteChar();
    }
}
