"use client";

import { SlackMessageExtension } from "@/components/editor/extensions/slack-message";
import { TagExtension } from "@/components/editor/extensions/tag";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// define your extension array
const extensions = [StarterKit, TagExtension, SlackMessageExtension];

const content = `<div></div>`;

export const Editor = () => {
  const [fileContents, setFileContents] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const editor = useEditor({
    content,
    extensions,
    immediatelyRender: false,
  });

  useEffect(() => {
    // Establish socket connection
    const socket = io({
      path: "http://localhost:3000/api/document",
      addTrailingSlash: false,
    });

    // Listen for file updates
    socket.on(
      "file-updated",
      (data: { contents: string; timestamp: string }) => {
        setFileContents(data.contents);
        setLastUpdated(data.timestamp);
      },
    );

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(fileContents, lastUpdated);

  return <EditorContent editor={editor} />;
};
