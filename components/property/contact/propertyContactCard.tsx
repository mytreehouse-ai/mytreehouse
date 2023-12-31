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
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const PropertyContactCard = () => {
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

            <Button className="mt-8 w-full" type="submit">
              Inquire
            </Button>
          </form>
        </Form>
  );
};

export default PropertyContactCard;
