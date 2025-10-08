import type { Command } from "./Command";
import type { AlignmentStrategy } from "../strategy/AlignmentStrategy";

export class AlignStrategyCommand implements Command {
    private prev!: AlignmentStrategy;

  // ⛔️ parameter properties prohibidas ⇒ declarar campos y asignar
  private getFn: () => AlignmentStrategy;
  private setFn: (s: AlignmentStrategy) => void;
  private next: AlignmentStrategy;

  constructor(
    getFn: () => AlignmentStrategy,
    setFn: (s: AlignmentStrategy) => void,
    next: AlignmentStrategy
  ) {
    this.getFn = getFn;
    this.setFn = setFn;
    this.next = next;
  }

  execute(): void {
    this.prev = this.getFn();
    this.setFn(this.next);
  }

  undo(): void {
    this.setFn(this.prev);
  }
}
