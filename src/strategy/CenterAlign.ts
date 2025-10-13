import type { AlignmentStrategy } from "./AlignmentStrategy";

export class CenterAlign implements AlignmentStrategy {
  align(text: string, width: number): string {
    return text
      .split("\n")
      .map(line => {
        const trimmed = line.trim();
        const spaces = Math.floor((width - trimmed.length) / 2);
        return " ".repeat(spaces > 0 ? spaces : 0) + trimmed;
      })
      .join("\n");
  }
}
