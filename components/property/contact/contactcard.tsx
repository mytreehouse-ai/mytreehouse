"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const ContactCard = () => {
  const contactFormSchema = z.object({
    fullName: z.string().nonempty({ message: "Please enter your full name" }),
    contactNumber: z
      .string()
      .nonempty({ message: "Please enter your contact number" }),
    emailAddress: z
      .string()
      .email()
      .nonempty({ message: "Please enter your email address" }),
    message: z.string().nonempty({ message: "Please enter your message" }),
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log(values);
  };

  return (
    <Card className="relative w-full overflow-y-auto rounded-t-3xl md:rounded-xl">
      <CardContent>
        <Form {...form}>
          <form
            name="contact_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your contact number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Leave us a message" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex space-x-2">
              <Checkbox id="report" />
              <label
                htmlFor="report"
                className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Did you get your free MyTreeHouse report?
              </label>
            </div>
            <Button className="mt-8 w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
