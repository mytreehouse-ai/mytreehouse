"use client";

import React, { useRef } from "react";
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
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PulseLoader from "../loader/pulseloader";
import { cn } from "@/lib/utils";

const ChatBox = () => {
  const [enableQuery, setEnableQuery] = useState(false);
  const [message, setMessage] = useState("What can you do?")
  const [tempId, setTempId] = useState(1)

  const { chats, setChatMessage } = ChatSessionState();

  const messageParentRef = useRef<HTMLDivElement>(null);
  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const form = useForm<BotQuestionSchemaType>({
    resolver: zodResolver(botQuestionSchema),
  });

  const { data, isFetching, setData } = useBotAssistant({
    q: message,
    enabled: enableQuery,
  });

  useEffect(() => {
    if (messageParentRef?.current && chats) {
      messageParentRef.current.scrollTop =
        messageParentRef.current.scrollHeight;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  useEffect(() => {
    if (!isFetching && data) {
      setChatMessage({
        tempId,
        from: "bot",
        message: data,
      });
      setData(null)
      setTempId(Date.now())

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollToBottomRef?.current) {
        scrollToBottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [chats.length]);

  const onSubmit = () => {
    const formData = form.getValues();
    setMessage(formData.q)
    form.reset();
    setEnableQuery(true);
    setChatMessage({
      tempId: Date.now(),
      from: "user",
      message: formData.q,
    });
  };

  return (
    <>
      <Card className="relative w-full text-sm shadow-none md:mx-auto md:w-3/4">
        <CardHeader className="p-4">
          <CardTitle>AI assistant {isFetching ? "..." : ""}</CardTitle>
        </CardHeader>
        <CardContent ref={messageParentRef} className="h-[calc(100vh-20rem)] space-y-4 overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.tempId} className={cn("flex gap-x-2", chat.from === "bot" ? "items-start" : "justify-end")}>
              {chat.from === "bot" && <div className="h-6 w-6 shrink-0 rounded-full  bg-emerald-400" />}
              <div className="rounded-md bg-neutral-50 px-4 py-2 shadow-sm">
                <div className="prose lg:prose-sm">
                  <Markdown remarkPlugins={[remarkGfm]}>{chat.message}</Markdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollToBottomRef} />
        </CardContent>
        {isFetching && (
          <div className="absolute px-1 left-6">
            <PulseLoader />
          </div>
        )}
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
                        disabled={isFetching}
                      />
                    </FormControl>
                    <button type="submit" disabled={isFetching}>
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

export default ChatBox;

