import React from "react";
import ChatBox from "@/components/ai-assistant/ChatBox";
import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <div className="fixed top-0 z-40 mt-16 w-full items-center justify-center  bg-white p-4 lg:z-50 xl:z-50">
      <ChatBox />
    </div>
  );
};

export default page;
