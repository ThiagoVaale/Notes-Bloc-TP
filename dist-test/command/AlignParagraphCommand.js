export class AlignParagraphCommand {
    constructor(paragraph, strategy) {
        this.paragraph = paragraph;
        this.strategy = strategy;
        this.previous = paragraph.getText();
    }
    execute() {
        const aligned = this.strategy.align(this.previous, 80);
        this.paragraph.setText(aligned);
    }
    undo() {
        this.paragraph.setText(this.previous);
    }
}
