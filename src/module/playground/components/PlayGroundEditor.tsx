"use client";

import { useEffect, useRef } from "react";
import { TemplateFile } from "../lib/pathToJson";
import { Editor, Monaco } from "@monaco-editor/react";
import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "../lib/editor-config";
import { editor } from "monaco-editor";

interface PlaygroundEditorProps {
  activeFile: TemplateFile | undefined;
  content: string;
  onContentChange: (value: string) => void;
}

export default function PlayGroundEditor({
  activeFile,
  content,
  onContentChange,
}: PlaygroundEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    console.log("Editor instance mounted:", !!editorRef.current);

    editor.updateOptions({
      ...defaultEditorOptions,
      // Enable inline suggestions but with specific settings to prevent conflicts
      inlineSuggest: {
        enabled: true,
        mode: "prefix",
        suppressSuggestions: false,
      },
    });
    configureMonaco(monaco);

    updateEditorLanguage();
  };
  const updateEditorLanguage = () => {};
  useEffect(() => {
    updateEditorLanguage();
  }, [activeFile]);
  return (
    <div className="h-full relative">
      <Editor
        height={"100%"}
        value={content}
        onChange={(value) => onContentChange(value || "")}
        onMount={handleEditorDidMount}
        language={
          activeFile
            ? getEditorLanguage(activeFile.fileExtension || "")
            : "plain-text"
        }
        options={
          defaultEditorOptions as unknown as editor.IStandaloneEditorConstructionOptions
        }
      />
    </div>
  );
}
