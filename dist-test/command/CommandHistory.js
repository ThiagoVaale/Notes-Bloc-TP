export class CommandHistory {
    constructor() {
        this.history = [];
    }
    executeCommand(command) {
        command.execute();
        this.history.push(command);
    }
    undo() {
        const command = this.history.pop();
        if (command)
            command.undo();
    }
}
