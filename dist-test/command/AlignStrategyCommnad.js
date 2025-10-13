export class AlignStrategyCommand {
    constructor(getFn, setFn, next) {
        this.getFn = getFn;
        this.setFn = setFn;
        this.next = next;
    }
    execute() {
        this.prev = this.getFn();
        this.setFn(this.next);
    }
    undo() {
        this.setFn(this.prev);
    }
}
