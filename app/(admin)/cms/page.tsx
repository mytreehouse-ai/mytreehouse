import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";
import Test from "@/components/cms/test";

const page = async () => {
  const user = await getUserOrRedirect();

  return (
    <div>
      <Test />
    </div>
  );
};

export default page;
