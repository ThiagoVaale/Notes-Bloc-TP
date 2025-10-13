export class InsertCharCommand {
    constructor(document, char) {
        this.document = document;
        this.char = char;
    }
    execute() {
        this.document.insertChar(this.char);
    }
    undo() {
        this.document.deleteChar();
    }
}
