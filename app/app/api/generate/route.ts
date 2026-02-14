import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { noteContent, difficulty } = await req.json();

    const prompt = `Generate 5 multiple choice quiz questions from these notes.
Return ONLY valid JSON in this format:

{
  "questions": [
    {
      "id": "q1",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Why this is correct",
      "topic": "main topic"
    }
  ]
}

Notes: ${noteContent}
Difficulty: ${difficulty}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY!,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json(
        { error: "Gemini failed", details: data },
        { status: 500 }
      );
    }

    let text =
  data.candidates?.[0]?.content?.parts?.[0]?.text || "";

text = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let quizData;

try {
  quizData = JSON.parse(text);
} catch {
  return NextResponse.json(
    { error: "Invalid JSON from Gemini", raw: text },
    { status: 500 }
  );
}

return NextResponse.json(quizData);

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Server crashed" },
      { status: 500 }
    );
  }
}
