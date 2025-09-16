
import { getAllPlaygroundForUser } from "@/module/dashboard/actions";
import AddNewButton from "@/module/dashboard/components/AddNewButton";

import React from "react";

const Page = async () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
      </div>
    </div>
  );
};

export default Page;
