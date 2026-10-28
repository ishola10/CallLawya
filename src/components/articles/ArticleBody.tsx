type Block = { type: "heading" | "paragraph"; text: string } | { type: "list"; items: string[] };

function parseBlocks(body: string): Block[] {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { type: "heading", text: chunk.slice(3).trim() };
      const lines = chunk.split("\n").map((line) => line.trim());
      if (lines.every((line) => line.startsWith("- "))) {
        return { type: "list", items: lines.map((line) => line.slice(2).trim()) };
      }
      return { type: "paragraph", text: lines.join(" ") };
    });
}

export default function ArticleBody({ body }: { body: string }) {
  return (
    <div className="space-y-5 text-lg leading-8 text-slate-700">
      {parseBlocks(body).map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={index} className="pt-3 font-serif text-2xl font-bold text-navy md:text-3xl">
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6 marker:text-brand">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
