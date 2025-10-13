import { Page } from "./Page";
export class Document {
    constructor() {
        this.pages = [new Page()];
    }
    getCurrentPage() {
        return this.pages[this.pages.length - 1];
    }
    getText() {
        return this.pages.map(p => p.getText()).join("\n--- PAGE BREAK ---\n");
    }
    getWordCount() {
        return this.pages.reduce((sum, p) => sum + p.getWordCount(), 0);
    }
    getPageCount() {
        return this.pages.length;
    }
    insertChar(char) {
        this.getCurrentPage().insertChar(char);
    }
    deleteChar() {
        this.getCurrentPage().deleteChar();
    }
}
