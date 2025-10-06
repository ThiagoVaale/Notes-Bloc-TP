import type { AlignmentStrategy } from "./AlignmentStrategy";

export class CenterAlign implements AlignmentStrategy {
  apply(lines: string[]): string[] {
    const maxLength = Math.max(...lines.map(line => line.trim().length));
    return lines.map(line => {
      const trimmed = line.trim();
      const totalSpaces = maxLength - trimmed.length;
      const leftSpaces = Math.floor(totalSpaces / 2);
      const rightSpaces = totalSpaces - leftSpaces;
      return " ".repeat(leftSpaces) + trimmed + " ".repeat(rightSpaces);
    });
  }
}
