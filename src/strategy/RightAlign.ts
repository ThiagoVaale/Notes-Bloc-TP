import type { AlignmentStrategy } from "./AlignmentStrategy";

export class RightAlign implements AlignmentStrategy {
  align(text: string, width: number): string {
    return text
      .split("\n")
      .map(line => line.trimStart().padStart(width))
      .join("\n");
  }
}
