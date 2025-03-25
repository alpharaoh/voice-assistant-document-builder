"use client";

import { SlackMessageExtension } from "@/components/editor/extensions/slack-message";
import { TagExtension } from "@/components/editor/extensions/tag";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

// define your extension array
const extensions = [StarterKit, TagExtension, SlackMessageExtension];

const content = `<div></div>`;

export const Editor = () => {
  const editor = useEditor({
    content,
    extensions,
    immediatelyRender: false,
  });

  useEffect(() => {
    const eventSource = new EventSource("/api/document");

    eventSource.onmessage = (event) => {
      const data = event.data;
      if (data) {
        editor?.commands.setContent(data);
      } else if (data.error) {
        editor?.commands.setContent("An error occurred");
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [editor]);

  return <EditorContent editor={editor} />;
};
