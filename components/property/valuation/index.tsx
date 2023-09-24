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
import PropertyDetails from "./propertyDetails";

const Valuation: React.FC = () => {
  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
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
