
import { GoogleGenAI, Type } from "@google/genai";
import { Quiz, QuestionType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuiz = async (topic: string): Promise<Quiz> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `أنشئ اختباراً تعليمياً باللغة العربية حول الموضوع التالي: ${topic}. 
    يجب أن يتكون الاختبار من 5 أسئلة متنوعة بين (اختيار من متعدد) و (صح وخطأ).
    تأكد من أن الأسئلة دقيقة تعليمياً وتتضمن تفسيراً لكل إجابة.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subject: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { 
                  type: Type.STRING,
                  enum: [QuestionType.MULTIPLE_CHOICE, QuestionType.TRUE_FALSE]
                },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Required for MULTIPLE_CHOICE. For TRUE_FALSE, use empty array or omit."
                },
                correctAnswer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["id", "type", "question", "correctAnswer", "explanation"]
            }
          }
        },
        required: ["title", "subject", "questions"]
      }
    }
  });

  try {
    const quizData = JSON.parse(response.text);
    return quizData as Quiz;
  } catch (error) {
    console.error("Failed to parse quiz response:", error);
    throw new Error("حدث خطأ أثناء إنشاء الاختبار. يرجى المحاولة مرة أخرى.");
  }
};
