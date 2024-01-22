import { useState, useEffect } from 'react';
import { BotQuestionSchemaType } from "@/schema/bot/botQuestionSchema";
import { createSearchParams } from "@/lib/utils";

const useBotAssistant = ({ q, enabled }: BotQuestionSchemaType) => {
  const [data, setData] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    if(!enabled){
        return;
    } 

    const fetchData = async () => {
      setIsFetching(true);
      setIsFetched(false);
      const searchParams = createSearchParams({ q: q });

      let url = `https://mytreehouse.ashycliff-1629d0c8.southeastasia.azurecontainerapps.io/ml/langchain/chat-openai`;

      if (searchParams?.size) {
        url = url + "?" + searchParams.toString();
      }

      try {
        const response = await fetch(url);

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
          // const lines = decodedChunk.split("\n");
          // const parsedLines = lines
          //   .filter((line) => line !== "")
          //   .map((line) => JSON.stringify(line))
          //   .map((line) => JSON.parse(line));
               const lines = decodedChunk.split("\n").filter((line) => line !== "")
            .map((line) => JSON.stringify(line))
            .map((line) => JSON.parse(line));

          for (const parsedLine of lines) {
            if (parsedLine) {
              setData((e) => (e ? `${e}\n${parsedLine}` : parsedLine));
           
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
         setIsFetching(false);
           setIsFetched(true);
      }
    };

    fetchData();
  }, [q, enabled]);

  return {
    data,
    isFetching,
    isFetched
  };
};

export default useBotAssistant;
