import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { getMcpTools } from "@/lib/mcp/tools";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const tools = await getMcpTools();

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: SYSTEM_PROMPT,
    messages,
    tools,
    maxSteps: 10,
  });

  return result.toDataStreamResponse();
}
