import type { Command } from "./Command";


export class DeleteCommand implements Command {
    private document: string[];
    private position: number;
    private deletedChar: string | null = null;

    constructor(document: string[], position:number){
        this.document = document;
        this.position = position;
    }

    execute(): void {
        this.deletedChar = this.document[this.position];
        this.document.splice(this.position, 1);
    }

    undo(): void{
        if(this.deletedChar !== null){
            this.document.splice(this.position, 0, this.deletedChar);
        }
    }
}