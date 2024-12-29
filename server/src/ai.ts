import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME: string = "gemini-1.5-flash";
const API_KEY: string = process.env.API_KEY || "no key";

export async function generateContent(prompt: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
    };

    const parts = [{ text: prompt }];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
    });

    return result.response.text();
}

