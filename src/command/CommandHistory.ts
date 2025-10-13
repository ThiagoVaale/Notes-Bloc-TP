import type { Command } from "./Command";

export class CommandHistory {
  private history: Command[] = [];
  private pointer: number = -1;
  
  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undo(): void {
    const command = this.history.pop();
    if (command) command.undo();
  }
  
  canUndo(): boolean {
    return this.pointer >= 0;
  }
}
