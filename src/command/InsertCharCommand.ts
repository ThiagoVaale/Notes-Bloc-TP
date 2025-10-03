import type { Command } from "./Command";


export class InsertCharCommand implements Command {
    private document: string[];
    private char: string;
    private position: number;

    constructor(document: string[], char: string, position: number){
        this.document = document;
        this.char = char;
        this.position = position;
    }

    execute(): void {
        this.document.splice(this.position, 0, this.char);
    }

    undo(): void {
        this.document.splice(this.position, 1);
    }
}