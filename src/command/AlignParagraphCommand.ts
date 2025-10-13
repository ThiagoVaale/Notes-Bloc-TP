import { Paragraph } from "../composite/Paragraph";
import type { AlignmentStrategy } from "../strategy/AlignmentStrategy";
import type { Command } from "./Command";

export class AlignParagraphCommand implements Command {
  private paragraph: Paragraph;
  private strategy: AlignmentStrategy;
  private previous: string;

  constructor(paragraph: Paragraph, strategy: AlignmentStrategy) {
    this.paragraph = paragraph;
    this.strategy = strategy;
    this.previous = paragraph.getText();
  }

  execute(): void {
    const aligned = this.strategy.align(this.previous, 80);
    this.paragraph.setText(aligned);
  }

  undo(): void {
    this.paragraph.setText(this.previous);
  }
}
