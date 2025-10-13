import type { Alignment } from "../types/Aligment";
import type { Command } from "./Command";

export class ChangeAlignmentCommand implements Command {
  private setAlignment: React.Dispatch<React.SetStateAction<Alignment>>;
  private previous: Alignment;
  private next: Alignment;

  constructor(
    setAlignment: React.Dispatch<React.SetStateAction<Alignment>>,
    previous: Alignment,
    next: Alignment
  ) {
    this.setAlignment = setAlignment;
    this.previous = previous;
    this.next = next;
  }

  execute(): void {
    this.setAlignment(this.next);
  }

  undo(): void {
    this.setAlignment(this.previous);
  }
}
