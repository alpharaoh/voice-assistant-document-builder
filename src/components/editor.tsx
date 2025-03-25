"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

export const Editor = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  return <EditorContent editor={editor}></EditorContent>;
};
