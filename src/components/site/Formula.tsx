import katex from "katex";
import { useMemo } from "react";

export function Formula({ tex, inline = false }: { tex: string; inline?: boolean }) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        throwOnError: false,
        displayMode: !inline,
        output: "html",
      }),
    [tex, inline],
  );
  if (inline) return <span className="katex-inline" dangerouslySetInnerHTML={{ __html: html }} />;
  return (
    <div className="overflow-x-auto py-2">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
