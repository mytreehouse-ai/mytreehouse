"use client";

import React, { Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const Overview = React.lazy(
  () => import("@/components/admin/dashboard/overview/overview"),
);
const AgGridTable = React.lazy(
  () => import("@/components/admin/dashboard/table/AgGridTable"),
);
const Chat = React.lazy(() => import("@/components/admin/dashboard/chat/Chat"));

const Dashboard = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <div>
      <Tabs
        defaultValue={activeTab ? activeTab : "overview"}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="overview"
            onClick={() =>
              router.replace(`${window.location.pathname}?tab=overview`)
            }
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="table"
            onClick={() =>
              router.replace(`${window.location.pathname}?tab=table`)
            }
          >
            AG Grid Table
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            onClick={() =>
              router.replace(`${window.location.pathname}?tab=chat`)
            }
          >
            Chat
          </TabsTrigger>
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
        <TabsContent value="chat" className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Chat />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
