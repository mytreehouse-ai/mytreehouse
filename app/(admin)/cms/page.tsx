import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";
import Test from "@/components/cms/test";
import Table from "@/components/cms/Table";

const page = async () => {
  const user = await getUserOrRedirect();

  return (
    <div>
      <Test />
      <Table />
    </div>
  );
};

export default page;
