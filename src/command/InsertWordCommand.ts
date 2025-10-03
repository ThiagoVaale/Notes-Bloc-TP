import type { Command } from "./Command";


export class InsertCharCommand implements Command {
    private document: string[];
    private word: string;
    private position: number;

    constructor(document: string[], word: string, position: number){
        this.document = document;
        this.word = word;
        this.position = position;
    }

    execute(): void {
        this.document.splice(this.position, 0, this.word);
    }

    undo(): void {
        this.document.splice(this.position, 1);
    }
}