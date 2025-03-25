"use client";

import { SlackMessageExtension } from "@/components/editor/extensions/slack-message";
import { TagExtension } from "@/components/editor/extensions/tag";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// define your extension array
const extensions = [StarterKit, TagExtension, SlackMessageExtension];

const content = `<div></div>`;

export const Editor = () => {
  const editor = useEditor({
    content,
    extensions,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};
