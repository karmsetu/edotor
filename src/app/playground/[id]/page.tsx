"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TemplateFileTree } from "@/module/playground/components/playGroundExplorer";
import { useFileExplorer } from "@/module/playground/hooks/useFileExplorer";
import { usePlayground } from "@/module/playground/hooks/usePlayground";
import { TemplateFile } from "@/module/playground/lib/pathToJson";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PlaygroundPage() {
  const { id } = useParams<{ id: string }>();
  const { playgroundData, templateData, isLoading, error, saveTemplateData } =
    usePlayground(id);

  const {
    activeFileId,
    openFile,
    closeAllFiles,
    openFiles,
    setTemplateData,
    setOpenFiles,
    setPlaygroundId,
    setActiveFileId,
  } = useFileExplorer();

  useEffect(() => {
    setPlaygroundId(id);
  }, [id, setPlaygroundId]);

  useEffect(() => {
    if (templateData && !openFiles.length) {
      setTemplateData(templateData);
    }
  }, [templateData, setTemplateData, openFiles.length]);

  const activeFile = openFiles.find((file) => file.id === activeFileId);
  const hasUnsavedChanges = openFiles.some((file) => file.hasUnsavedChanges);

  const handleFileSelect = (file: TemplateFile) => {
    openFile(file);
  };

  return (
    <TooltipProvider>
      <TemplateFileTree
        data={templateData!}
        onFileSelect={handleFileSelect}
        selectedFile={activeFile}
        title="File Explorer"
        onAddFile={() => {}}
        onAddFolder={() => {}}
        onDeleteFile={() => {}}
        onDeleteFolder={() => {}}
        onRenameFile={() => {}}
        onRenameFolder={() => {}}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
      </SidebarInset>
    </TooltipProvider>
  );
}
