import { Badge } from "@/components/ui/badge";
import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export const TagExtension = Node.create({
  name: "tag",
  group: "inline",
  content: "inline*",

  inline: true,

  parseHTML() {
    return [{ tag: "tag" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["tag", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

const Component = () => {
  return (
    <NodeViewWrapper>
      <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 text-sm">
        <NodeViewContent className="content is-editable" />
      </Badge>
    </NodeViewWrapper>
  );
};
