import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textFromNode((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function headingId(children: ReactNode): string {
  return textFromNode(children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function ResourceLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const className =
    "font-medium text-blue underline decoration-blue/35 underline-offset-3 hover:text-blue-bright hover:decoration-blue";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      {...props}
      href={href}
      className={className}
      rel="noopener"
      target="_blank"
    >
      {children}
    </a>
  );
}

const components: Components = {
  h1: () => null,
  h2: ({ children }) => (
    <h2 id={headingId(children)} className="scroll-mt-24 text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={headingId(children)} className="scroll-mt-24 text-xl">
      {children}
    </h3>
  ),
  p: ({ children }) => <p>{children}</p>,
  a: ResourceLink,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-blue">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-7 border-l-[3px] border-blue bg-muted/55 py-4 pl-5 pr-5 text-foreground">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-navy-deep text-white">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
  tr: ({ children }) => <tr className="align-top">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3 leading-relaxed">{children}</td>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  hr: () => <hr className="my-10 border-border" />,
};

export function ResourceMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-measure text-[1.0625rem] leading-[1.75] text-foreground",
        "[&_p]:mb-5 [&_h2]:mb-4 [&_h2]:mt-14 [&_h3]:mb-3 [&_h3]:mt-9",
        "[&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-blue",
        "[&_table_ul]:mb-0 [&_table_ul]:space-y-1",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
