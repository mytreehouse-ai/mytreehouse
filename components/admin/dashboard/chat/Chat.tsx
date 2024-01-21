"use client";

import React from "react";
import { useState, useEffect } from "react";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";
import { number } from "zod";

interface TextResponse {
  line: string;
  index: number;
}

const Chat = () => {
  const [data, setData] = useState(null);

  const queryParams = "Warehouse available along taguig city with 100-300sqm?";

  const fetchAnswer = async () => {
    try {
      const response = await fetch(
        `https://mytreehouse.ashycliff-1629d0c8.southeastasia.azurecontainerapps.io/ml/langchain/chat-openai?q=${queryParams}`,
        {
          method: "GET",
        },
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const chunk = await reader?.read();
        if (!chunk) {
          break;
        }
        const { done, value } = chunk;
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, " ").trim())
          .filter((line) => line !== "")
          .map((line) => JSON.stringify(line))
          .map((line) => JSON.parse(line));

        for (const parsedLine of parsedLines) {
          if (parsedLine) {
            setData((e) => (e ? `${e}\n${parsedLine}` : parsedLine));
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnswer();
  }, []);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Chat bot</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p>Result</p>
          {data &&
            data
              .split("\n")
              .map(({ line, index }: TextResponse) => (
                <p key={index}>{line}</p>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;
