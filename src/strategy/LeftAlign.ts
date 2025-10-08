import type { AlignmentStrategy } from "./AlignmentStrategy";

export class LeftAlign implements AlignmentStrategy {
  apply(lines: string[]): string[] {
    return lines.map(line => line.trimStart());
  }
}
