import type { Command } from "./Command";


export class CommandHistory {
    private history: Command[] = [];

    execute(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  canUndo(): boolean {
    return this.history.length > 0;
  }

  undo(): void {
    const cmd = this.history.pop();
    if (cmd) cmd.undo();
  }
}