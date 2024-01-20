"use client";

import React from "react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";

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
      const json = await response.arrayBuffer;
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnswer();
  }, []);

  //   useEffect(() => {
  //     fetch(
  //       `https://mytreehouse.ashycliff-1629d0c8.southeastasia.azurecontainerapps.io/ml/langchain/chat-openai?q=${queryParams}`,
  //     )
  //       .then((response) => {
  //         const reader = response?.body?.getReader();
  //         return new ReadableStream({
  //           start(controller) {
  //             function push() {
  //               reader.read().then(({ done, value }) => {
  //                 if (done) {
  //                   controller.close();
  //                   return;
  //                 }
  //                 controller.enqueue(value);
  //                 push();
  //               });
  //             }
  //             push();
  //           },
  //         });
  //       })
  //       .then((stream) => {
  //         // Convert the stream to JSON
  //         return new Response(stream).json();
  //       })
  //       .then((json) => {
  //         // Process the JSON
  //         setData(json);
  //       });
  //   }, []);

  console.log(data);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Chat bot</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactMarkdown>{data}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default Chat;
