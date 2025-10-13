import { Word } from "./Word";
export class Line {
    constructor() {
        this.words = [];
    }
    add(element) {
        this.words.push(element);
    }
    getText() {
        return this.words.map(w => w.getText()).join("");
    }
    getWordCount() {
        return this.words.reduce((sum, w) => sum + w.getWordCount(), 0);
    }
    getPageCount() {
        return 0;
    }
    deleteLastChar() {
        const lastWord = this.words[this.words.length - 1];
        if (!lastWord)
            return;
        const newText = lastWord.getText().slice(0, -1);
        if (newText.length === 0)
            this.words.pop();
        else
            lastWord.setText(newText);
    }
    insertChar(char) {
        if (this.words.length === 0 || /\s/.test(char)) {
            this.words.push(new Word(char));
        }
        else {
            const lastWord = this.words[this.words.length - 1];
            lastWord.setText(lastWord.getText() + char);
        }
    }
}
