
import { deleteProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from "@/module/dashboard/actions";
import AddNewButton from "@/module/dashboard/components/AddNewButton";
import AddRepo from "@/module/dashboard/components/AddRepoButton";
import EmptyState from "@/module/dashboard/components/EmptyState";
import ProjectTable from "@/module/dashboard/components/ProjectTable";
import { Project } from "@/module/dashboard/types";

import React from "react";

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  console.log("Playgrounds:", playgrounds);
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playgrounds && playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={playgrounds as Project[] || []}
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
