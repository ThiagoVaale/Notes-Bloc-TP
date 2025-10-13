import { Line } from "./Line";
import { Word } from "./Word";
export class Paragraph {
    constructor() {
        this.lines = [new Line()];
    }
    add(element) {
        this.lines.push(element);
    }
    getCurrentLine() {
        return this.lines[this.lines.length - 1];
    }
    getText() {
        return this.lines.map(l => l.getText()).join("\n");
    }
    getWordCount() {
        return this.lines.reduce((sum, l) => sum + l.getWordCount(), 0);
    }
    getPageCount() {
        return 0;
    }
    insertChar(char) {
        this.getCurrentLine().insertChar(char);
    }
    deleteChar() {
        this.getCurrentLine().deleteLastChar();
    }
    setText(value) {
        (this.lines = [new Line()]);
        this.getCurrentLine().add(new Word(value));
    }
}
