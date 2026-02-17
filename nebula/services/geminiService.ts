import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const solveComplexProblem = async (problem: string): Promise<string> => {
  try {
    // Using gemini-3-flash-preview which supports reasoning and thinking
    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: problem,
      config: {
        systemInstruction: "أنت خبير تقني ومستشار ذكي جداً في حل المشكلات. قم بتحليل المشكلة بعمق، فكر في الخطوات المنطقية، ثم قدم حلاً مفصلاً ودقيقاً باللغة العربية. استخدم التنسيق المنظم (نقاط، خطوات).",
        // Enable thinking for better reasoning capabilities
        thinkingConfig: {
            thinkingBudget: 1024 // Allow tokens for internal reasoning
        }
      },
    });

    return response.text || "لم أتمكن من إيجاد حل، يرجى إعادة صياغة المشكلة.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("حدث خطأ أثناء معالجة الطلب بالذكاء الاصطناعي");
  }
};