import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/lib/chat-store";
import { useWordStreaming } from "@/hooks/useWordStreaming";

interface Message {
  role: "bot" | "user";
  text: string;
}

export const MioxBot = () => {
  const { isOpen, setIsOpen, prefilledMessage, setPrefilledMessage } =
    useChatStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello! I am Miox-Bot. How can I assist you with your policies today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!prefilledMessage) return;

    const processInquiry = () => {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: prefilledMessage },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "I have accessed the policy details you mentioned. I can provide a summary or check for any specific clauses. What would you like to know?",
          },
        ]);
      }, 1000);

      setPrefilledMessage("");
    };

    const timeoutId = setTimeout(processInquiry, 0);
    return () => clearTimeout(timeoutId);
  }, [prefilledMessage, setPrefilledMessage]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Understood. Analyzing the data for you..." },
      ]);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-amber-600 hover:bg-amber-500 shadow-2xl z-50 transition-all hover:scale-110 active:scale-95 border-0 group"
      >
        <MessageSquare className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] bg-zinc-950 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-[500px] z-50 animate-in slide-in-from-bottom-5 overflow-hidden ring-1 ring-zinc-800">
      <CardHeader className="border-b border-zinc-800 p-4 flex flex-row items-center justify-between bg-zinc-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 rounded-lg">
            <Bot className="h-5 w-5 text-amber-500" />
          </div>
          <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">
            Miox Assistant
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-zinc-500 hover:text-white rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/30"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-amber-600 text-white rounded-br-none shadow-md"
                  : "bg-zinc-900 text-zinc-200 rounded-bl-none border border-zinc-800"
              }`}
            >
              {msg.role === "bot" && i === messages.length - 1 ? (
                <StreamingText text={msg.text} />
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-zinc-900 border-zinc-800 text-white rounded-full focus-visible:ring-amber-500"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-lg transition-all active:scale-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const StreamingText = ({ text }: { text: string }) => {
  const { displayedText, isDone } = useWordStreaming(text);
  return (
    <span className="inline">
      {displayedText}
      {!isDone && (
        <span className="ml-1 inline-flex gap-0.5 align-middle">
          <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce"></span>
        </span>
      )}
    </span>
  );
};
