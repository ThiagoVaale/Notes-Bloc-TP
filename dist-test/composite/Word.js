export class Word {
    constructor(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }
    getWordCount() {
        return this.text.trim() ? 1 : 0;
    }
    getPageCount() {
        return 0;
    }
    setText(value) {
        this.text = value;
    }
}
