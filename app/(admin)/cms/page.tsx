import Overview from "@/components/admin/dashboard/overview/overview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";
import Test from "@/components/cms/test";

const page = async () => {
  const user = await getUserOrRedirect();

  return (
    <>
      {/* <div>
        <Test />
      </div> */}
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default page;
