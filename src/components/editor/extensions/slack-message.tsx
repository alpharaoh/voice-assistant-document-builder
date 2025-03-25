import { Card } from "@/components/ui/card";
import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import React from "react";

export const SlackMessageExtension = Node.create({
  name: "slack-message",
  group: "block",
  content: "inline*",

  parseHTML() {
    return [{ tag: "slack-message" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["slack-message", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

const Component = () => {
  return (
    <NodeViewWrapper>
      <Card className="flex flex-row gap-4 w-fit p-4 my-4">
        <Image
          src="/slack.svg"
          width={20}
          height={20}
          alt="Slack icon"
          className="h-fit mt-1"
        />
        <div>
          <span className="text-md font-semibold">Slack Message</span>
          <p className="text-sm text-muted-foreground">
            Send a message to Slack given generated output.
          </p>
        </div>
      </Card>
      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};
