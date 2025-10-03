import type { Command } from "./Command";

//Relacion con startegy.
//Command no sabe como alinear un parrafo.
//Solo encapsula la accion 'aplicar alineacion'y 'deshacerla'
//Para la logica concetra de alineacion, delega en Strategy.

//COMMAND = 'La orden (ejemplo: "Alinear este parrafo con esta estrategia")
//STRATEGY = 'La forma de hacerlo' (ejemplo: "aplicar espacios para centrar, justificar, etc")


export class AlignParagraphCommand implements Command {
    private paragraph: string[];
    private strategy: AligmentStrategy; //Implementacion con strategy para alineado de parrafo
    private previousState: string[];

    constructor(paragraph: string[], strategy: AligmentStrategy){
        this.paragraph = paragraph;
        this.strategy = strategy;
        this.previousState = [...paragraph];    
    }

    execute(): void {
        this.paragraph = this.strategy.apply(this.paragraph);
    }

    void(): void {
        this.paragraph = [...this.previousState]
    }
}