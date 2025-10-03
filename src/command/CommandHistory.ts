import type { Command } from "./Command";


export class CommandHistory {
    private history: Command[] = [];

    executeCommand(command: Command): void{
        command.execute();
        this.history.push(command);
    }

    undo(): void{
        const command = this.history.pop()
        if(command){
            command.undo();
        }
    }
}