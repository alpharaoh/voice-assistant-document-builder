"use client";

import { SlackMessageExtension } from "@/components/editor/extensions/slack-message";
import { TagExtension } from "@/components/editor/extensions/tag";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// define your extension array
const extensions = [StarterKit, TagExtension, SlackMessageExtension];

const content = `
<div>
  <p>Build a workflow that takes a legal document as input, extracts the date, short description, and parties involved.

  <tag>@input</tag>

  <tag>@generation</tag>

  <br/>

  <p>Given the generation, extract the key bits of information as mentioned initially and send a slack message with the extracted information:</p>

  <slack-message />
</div>`;

export const Editor = () => {
  const editor = useEditor({
    content,
    extensions,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};
