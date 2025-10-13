export class DeleteCommand {
    constructor(document) {
        this.deletedChar = null;
        this.document = document;
    }
    execute() {
        const currentText = this.document.getText();
        if (currentText.length === 0)
            return;
        this.deletedChar = currentText.slice(-1);
        this.document.deleteChar();
    }
    undo() {
        if (this.deletedChar) {
            this.document.insertChar(this.deletedChar);
            this.deletedChar = null;
        }
    }
}
