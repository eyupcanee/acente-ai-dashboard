import { useState, useEffect } from "react";

export const useWordStreaming = (text: string, speed: number = 150) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const words = text.split(" ");
    let i = 0;
    setDisplayedText("");
    setIsDone(false);

    const timer = setInterval(() => {
      setDisplayedText(words.slice(0, i + 1).join(" "));
      i++;

      if (i >= words.length) {
        clearInterval(timer);
        setIsDone(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isDone };
};
