import type { AlignmentStrategy } from "./AlignmentStrategy";

export class RightAlign implements AlignmentStrategy {
  apply(lines: string[]): string[] {
    const maxLength = Math.max(...lines.map(line => line.trim().length));
    return lines.map(line => {
      const trimmed = line.trim();
      const spaces = " ".repeat(maxLength - trimmed.length);
      return spaces + trimmed;
    });
  }
}
