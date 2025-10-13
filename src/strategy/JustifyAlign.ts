import type { AlignmentStrategy } from "./AlignmentStrategy";

export class JustifyAlign implements AlignmentStrategy {
  align(text: string, width: number): string {
    return text
      .split("\n")
      .map(line => {
        const words = line.trim().split(/\s+/);
        if (words.length === 1) return line;
        const totalChars = words.reduce((sum, w) => sum + w.length, 0);
        const spaces = width - totalChars;
        const spaceBetween = Math.floor(spaces / (words.length - 1));
        return words.join(" ".repeat(spaceBetween));
      })
      .join("\n");
  }
}
