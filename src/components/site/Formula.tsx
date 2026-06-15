import { BlockMath, InlineMath } from "react-katex";

export function Formula({ tex, inline = false }: { tex: string; inline?: boolean }) {
  if (inline) return <InlineMath math={tex} />;
  return (
    <div className="overflow-x-auto py-2">
      <BlockMath math={tex} />
    </div>
  );
}
