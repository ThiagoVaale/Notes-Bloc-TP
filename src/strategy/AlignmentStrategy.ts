export interface AlignmentStrategy {
  align(text: string, width: number): string;
}
