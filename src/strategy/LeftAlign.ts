import type { AlignmentStrategy } from "./AlignmentStrategy";

export class LeftAlign implements AlignmentStrategy {
  align(text: string): string {
    return text
      .split("\n")
      .map(line => line.trimStart())
      .join("\n");
  }
}
