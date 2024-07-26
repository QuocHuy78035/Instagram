import {
  ChatSession,
  GenerateContentResult,
  GenerativeModel,
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(
  process.env.API_KEY_GEMINI as string
);
const modelType: string = "gemini-1.5-flash";
export async function answerMessage(
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> {
  const model: GenerativeModel = genAI.getGenerativeModel({ model: modelType });
  const chat: ChatSession = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  const result: GenerateContentResult = await chat.sendMessage(message);
  return result.response.text();
}
