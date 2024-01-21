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
import useBotAssistant from "@/hooks/bot/useBotAssistant";
import { Send } from "lucide-react";
import ChatSessionState from "@/hooks/bot/useChatSessionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  botQuestionSchema,
  type BotQuestionSchemaType,
} from "@/schema/bot/botQuestionSchema";
import { cn } from "@/lib/utils";

const Chat = () => {
  const [enableQuery, setEnableQuery] = useState(false);

  const { chats, setChatMessage } = ChatSessionState();

  const latestUserChat = chats.filter((chat) => chat.from === "user").pop()
    ?.message;

  const q = "Warehouse available along taguig city with 100-300sqm?";

  const form = useForm<BotQuestionSchemaType>({
    resolver: zodResolver(botQuestionSchema),
  });

  console.log("Q", q);

  const { data, isFetching } = useBotAssistant({
    q: latestUserChat || "",
    enabled: enableQuery,
  });

  useEffect(() => {
    if (!isFetching && data) {
      setChatMessage({
        from: "bot",
        message: data,
      });
    }
  }, [data]);

  const onSubmit = () => {
    const formData = form.getValues();
    setEnableQuery(true);
    setChatMessage({
      from: "user",
      message: formData.q,
    });
  };

  return (
    <>
      <Card className="w-full text-sm shadow-none md:mx-auto md:w-3/4">
        <CardHeader className="p-4">
          <CardTitle>AI assistant</CardTitle>
        </CardHeader>
        <CardContent className=" h-[calc(100vh-20rem)] space-y-4 overflow-y-auto">
          {latestUserChat && (
            <div className="flex justify-end gap-x-2 ">
              <div className="rounded-md bg-neutral-50 px-4 py-2">
                {latestUserChat}
              </div>
              <div className="h-6 w-6 rounded-full border bg-primary-foreground" />
            </div>
          )}
          {data && (
            <div className="flex items-start gap-x-2">
              <div className="h-6 w-6 rounded-full border bg-primary" />
              <div className=" rounded-md bg-neutral-50 px-4 py-2">
                {data.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pb-4">
          <Form {...form}>
            <form
              name="bot-question-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 w-full"
            >
              <FormField
                control={form.control}
                name="q"
                render={({ field }) => (
                  <FormItem className="flex gap-x-2">
                    <FormControl>
                      <Input
                        placeholder="Message bot..."
                        {...field}
                        value={field.value ?? ""}
                        className="w-full"
                        width={"full"}
                      />
                    </FormControl>
                    <button type="submit">
                      <Send className="text-primary" />
                    </button>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardFooter>
      </Card>
    </>
  );
};

export default Chat;
