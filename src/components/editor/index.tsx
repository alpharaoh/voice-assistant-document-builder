"use client";

import { UserInputExtension } from "@/components/editor/extensions/input";
import { SlackMessageExtension } from "@/components/editor/extensions/slack-message";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// define your extension array
const extensions = [StarterKit, SlackMessageExtension, UserInputExtension];

const content = `<div>
  <p>Build a workflow that takes a legal document as input, extracts the date, short description, and parties involved.

  <user-input name="document" type="html" label="Document" />

  <generation model="gpt-3.5-turbo" temperature="0.7" >

  <br/>

  <p>Given the generation, extract the key bits of information as mentioned initially and send a slack message with the extracted information:</p>

  <slack-message description="Send a message with the details over slack" />
</div>`;

export const Editor = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  return <EditorContent editor={editor}></EditorContent>;
};
