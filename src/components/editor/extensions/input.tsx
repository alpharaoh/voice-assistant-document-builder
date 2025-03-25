import { Badge } from "@/components/ui/badge";
import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export const UserInputExtension = Node.create({
  name: "user-input",
  group: "block",
  content: "inline*",

  parseHTML() {
    return [{ tag: "user-input" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["user-input", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

const Component = () => {
  return (
    <NodeViewWrapper>
      <Badge>@input</Badge>
      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};
