"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BotQuestionSchemaType } from "@/schema/bot/botQuestionSchema";
import useBotAssistant from "@/hooks/bot/useBotAssistant";

const Chat = () => {
  const q = "your question here"; // replace with your actual question
  const data = useBotAssistant({ q });

  const form = useForm();

  const onSubmit = () => {
    const formData = form.getValues();
    console.log("submiited", formData);
  };

  return (
    <Card className="w-full text-sm shadow-none md:mx-auto md:w-3/4">
      <CardHeader>
        <CardTitle>AI assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {data &&
            data.split("\n").map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </CardContent>
      <CardFooter>
        <Form {...form}>
          <form
            name="bot-question-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Message bot..."
                      {...field}
                      value={field.value ?? ""}
                      className="w-full"
                      width={"full"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
