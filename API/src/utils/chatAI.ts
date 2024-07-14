import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI as string);
const modelType = "gemini-1.5-flash";

export async function answerMessage(message: string, history: Array<any>) {
  const model = genAI.getGenerativeModel({ model: modelType });
  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  const result = await chat.sendMessage(message);
  return result.response.text();
}
