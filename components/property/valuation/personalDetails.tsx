"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod'
import ValuationStepper from "@/hooks/useStepperStore";
import { personalDetailsFormSchema } from ".";
import { Checkbox } from "@/components/ui/checkbox";

const PersonalDetails: React.FC = () => {
  const { currentStepIndex, setCurrentStepIndex, steps } = ValuationStepper()

  const form = useForm<z.infer<typeof personalDetailsFormSchema>>({
    resolver: zodResolver(personalDetailsFormSchema),
  });

  const onSubmit = (values: z.infer<typeof personalDetailsFormSchema>) => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  }

  return (
    <Form {...form}>
      <form
        name="test"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Type your Last name here" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Type your First name here" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Type your address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="Type your phone number here" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Type your email address here" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex space-x-2">
          <Checkbox id="termsAndConditions" />
          <label
            htmlFor="termsAndConditions"
            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Using this valuation tool, I agree to mytree.house terms and conditions
          </label>
        </div>


        <div className="flex space-x-2">
          <Checkbox id="offers" />
          <label
            htmlFor="offers"
            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            MyTreeHouse can contact me about my property journey, with relevant properties, offers and news
          </label>
        </div>

        <Button className="w-full" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
};

export default PersonalDetails;
