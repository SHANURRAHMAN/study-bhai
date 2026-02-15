import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert academic research assistant.

For the topic: "${topic}"

Return:

- 3 Best FREE resources (with name + short description + direct URL)
- 3 Best PAID resources (with name + short description + direct URL)
- 2 Best YouTube playlists (with URL)
- 2 Best books (with purchase link)
- 2 Practice platforms (with URL)

Respond ONLY in clean JSON format:

{
  "free": [{ "title": "", "description": "", "url": "" }],
  "paid": [{ "title": "", "description": "", "url": "" }],
  "youtube": [{ "title": "", "description": "", "url": "" }],
  "books": [{ "title": "", "description": "", "url": "" }],
  "practice": [{ "title": "", "description": "", "url": "" }]
}

Return ONLY valid JSON. No markdown.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);

  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
