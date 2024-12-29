"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContent = generateContent;
const generative_ai_1 = require("@google/generative-ai");
const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.API_KEY || "no key";
function generateContent(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const generationConfig = {
            temperature: 1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1000,
        };
        const parts = [{ text: prompt }];
        const result = yield model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
        });
        return result.response.text();
    });
}
