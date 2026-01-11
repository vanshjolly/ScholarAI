
import { GoogleGenAI, Type } from "@google/genai";
import { StudyPlan, QuizQuestion } from "../types";

// Standard initialization for Gemini using the platform-provided API key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Optimized model for fast, free-tier usage
const MODEL_NAME = 'gemini-3-flash-preview';

export const getGeminiChatResponse = async (history: { role: 'user' | 'model', content: string }[], message: string) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "You are an AI Student Success Coach. Be helpful, concise, and encouraging. Focus on academic success and student well-being."
    }
  });

  return response.text || "I'm sorry, I couldn't process that.";
};

export const generateStudyPlan = async (subjects: string[], examDates: string, dailyHours: number): Promise<StudyPlan> => {
  const prompt = `Generate a structured study plan for a student taking the following subjects: ${subjects.join(', ')}. 
  The exams are scheduled around ${examDates}. The student can dedicate ${dailyHours} hours per day.
  Ensure the plan includes revision slots and break recommendations.`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subjects: { type: Type.ARRAY, items: { type: Type.STRING } },
          examDates: { type: Type.STRING },
          dailyHours: { type: Type.NUMBER },
          schedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                topic: { type: Type.STRING }
              },
              required: ["day", "time", "activity", "topic"]
            }
          }
        },
        required: ["subjects", "examDates", "dailyHours", "schedule"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as StudyPlan;
};

export const explainConcept = async (concept: string) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Explain "${concept}" in simple, intuitive terms for a university student. Include an analogy.`
  });
  return response.text || "Failed to generate explanation.";
};

export const generateStudyResources = async (notes: string) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Based on the following notes, provide a concise summary and 5 practice quiz questions.
    Notes: ${notes}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                answer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "answer", "explanation"]
            }
          }
        },
        required: ["summary", "quiz"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const getWellnessAdvice = async (mood: string) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `The student is feeling "${mood}". Provide comforting, non-medical advice for stress management and productivity. Start with a disclaimer that you are not a professional therapist.`
  });
  return response.text || "Be kind to yourself today.";
};
