export interface AlignmentStrategy {
    apply(lines: string[]): string[];
}
