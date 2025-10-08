import type { AlignmentStrategy } from "./AlignmentStrategy";

export class JustifyAlign implements AlignmentStrategy {
  apply(lines: string[]): string[] {
    const maxLength = Math.max(...lines.map(line => line.trim().length));
    return lines.map(line => {
      const words = line.trim().split(/\s+/);
      if (words.length === 1) return words[0]; 

      const totalChars = words.reduce((sum, w) => sum + w.length, 0);
      const totalSpaces = maxLength - totalChars;
      const gaps = words.length - 1;
      const spacesPerGap = Math.floor(totalSpaces / gaps);
      const extraSpaces = totalSpaces % gaps;

      return words
        .map((word, i) => {
          if (i === gaps) return word;
          const spaces = spacesPerGap + (i < extraSpaces ? 1 : 0);
          return word + " ".repeat(spaces);
        })
        .join("");
    });
  }
}
