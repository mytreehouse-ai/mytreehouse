import React, { Suspense } from "react";
import Logout from "@/components/cms/logout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";

const Overview = React.lazy(
  () => import("@/components/admin/dashboard/overview/overview"),
);
const AgGridTable = React.lazy(
  () => import("@/components/admin/dashboard/table/AgGridTable"),
);

const page = async () => {
  const user = await getUserOrRedirect();

  console.log(user);

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
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Dashboard</TabsTrigger>
              <TabsTrigger value="table">AG Grid Table</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Suspense fallback={<div>Loading...</div>}>
                <Overview />
              </Suspense>
            </TabsContent>
            <TabsContent value="table" className="space-y-4">
              <Suspense fallback={<div>Loading...</div>}>
                <AgGridTable />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default page;
