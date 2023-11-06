import React from "react";
import Logout from "@/components/cms/logout";
import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";
import Dashboard from "@/components/admin/dashboard/Dashboard";


const page = async () => {
  const user = await getUserOrRedirect();

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="flex items-center gap-x-2 text-3xl font-bold tracking-tight text-[#17a34a]">
              MyTreehouse
              <span className="text-xs font-normal text-neutral-700 ">
                Administrator
              </span>
            </h2>
            <Logout />
          </div>
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default page;
