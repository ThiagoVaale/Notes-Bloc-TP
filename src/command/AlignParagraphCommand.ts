import type { AlignmentStrategy } from "../strategy/AlignmentStrategy";
import type { Command } from "./Command";

export class AlignParagraphCommand implements Command {
    private paragraph: string[];
    private strategy: AlignmentStrategy; //Implementacion con strategy para alineado de parrafo
    private previousState: string[];

    constructor(paragraph: string[], strategy: AlignmentStrategy){
        this.paragraph = paragraph;
        this.strategy = strategy;
        this.previousState = [...paragraph];    
    }

    execute(): void {
        this.paragraph = this.strategy.apply(this.paragraph);
    }

    undo(): void {
        this.paragraph = [...this.previousState]
    }
}