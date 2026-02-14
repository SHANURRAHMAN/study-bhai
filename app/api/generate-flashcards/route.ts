import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { noteContent } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate 8 smart flashcards for active recall from these notes.

Return ONLY valid JSON in this format:

{
  "flashcards": [
    {
      "id": "f1",
      "front": "Question?",
      "back": "Clear concise answer.",
      "topic": "Main topic"
    }
  ]
}

Notes:
${noteContent}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Flashcard Error:", error);
    return NextResponse.json(
      { error: "Flashcard generation failed" },
      { status: 500 }
    );
  }
}
