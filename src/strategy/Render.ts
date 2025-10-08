import type { AlignmentStrategy } from "./AlignmentStrategy";

const PAGE_SEP = "===== FIN DE PÁGINA =====";

/** Alinea por párrafos (bloques separados por doble salto) */
export function renderAligned(content: string, strategy: AlignmentStrategy): string {
  const paragraphs = content.split(/\n{2,}/); // separa por uno o más dobles saltos
  const alignedBlocks = paragraphs.map(block => {
    if (block.trim() === PAGE_SEP) return PAGE_SEP; // no alinear el separador
    const lines = block.split("\n");
    const aligned = strategy.apply(lines);
    return aligned.join("\n");
  });
  return alignedBlocks.join("\n\n");
}
