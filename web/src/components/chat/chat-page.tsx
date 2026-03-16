"use client";

import { useChat } from "ai/react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";

export function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-3">
        <h1 className="text-lg font-semibold">YNAB Budget Chat</h1>
      </header>
      <MessageList messages={messages} isLoading={isLoading} />
      {error && (
        <div className="px-6 py-2 text-sm text-[var(--destructive)]">
          Error: {error.message}
        </div>
      )}
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
