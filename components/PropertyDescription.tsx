import ReactMarkdown from "react-markdown";

const textStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  color: "oklch(0.32 0.01 250)",
  margin: "0 0 10px",
};

export default function PropertyDescription({ description }: { description: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h4 style={{ fontSize: 17, fontWeight: 800, margin: "16px 0 8px" }} {...props} />,
        h2: ({ node, ...props }) => <h4 style={{ fontSize: 16, fontWeight: 800, margin: "16px 0 8px" }} {...props} />,
        h3: ({ node, ...props }) => <h4 style={{ fontSize: 15, fontWeight: 800, margin: "16px 0 8px" }} {...props} />,
        p: ({ node, ...props }) => <p style={textStyle} {...props} />,
        a: ({ node, ...props }) => <a style={{ color: "var(--accent)", fontWeight: 600 }} target="_blank" rel="noreferrer" {...props} />,
        ul: ({ node, ...props }) => <ul style={{ ...textStyle, paddingLeft: 18 }} {...props} />,
        ol: ({ node, ...props }) => <ol style={{ ...textStyle, paddingLeft: 18 }} {...props} />,
        li: ({ node, ...props }) => <li style={{ marginBottom: 4 }} {...props} />,
      }}
    >
      {description}
    </ReactMarkdown>
  );
}
