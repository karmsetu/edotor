"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TemplateFileTree } from "@/module/playground/components/playGroundExplorer";
import { usePlayground } from "@/module/playground/hooks/usePlayground";
import { useParams } from "next/navigation";

export default function PlaygroundPage() {
  const { id } = useParams<{ id: string }>();
  const { playgroundData, templateData, isLoading, error, saveTemplateData } =
    usePlayground(id);
  const activeFile = {
    filename: "sample",
    fileExtension: "txt",
    content: "string",
  };

  return (
    <TooltipProvider>
      <TemplateFileTree
        data={templateData!}
        onFileSelect={() => {}}
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
