"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PropertyDetails from "./propertyDetails";


const Valuation: React.FC = () => {
  return (
    <Card className="relative w-full h-[calc(100vh)] overflow-y-auto rounded-t-3xl rounded-b-none">
      <div className="p-6 sticky top-0 left-0 h-16 w-full bg-white z-20">
        <Progress value={23} />
      </div>
      <CardHeader className="">
        <CardTitle>Tell us about your property</CardTitle>
      </CardHeader>
      <CardContent>
        <PropertyDetails />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Next</Button>
      </CardFooter>
    </Card>
  );
};

export default Valuation;
