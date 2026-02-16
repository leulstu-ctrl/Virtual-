import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productName, description } = await req.json();

    if (!productName || !description) {
      return NextResponse.json(
        { error: "Product Name and Description are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not defined in environment variables." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a funny, viral 30-second TikTok script for a product named "${productName}".
    Product Description: "${description}".

    Format the script clearly.
    Use bold text for Scene Headers (e.g., **[Scene: Bedroom]**) and regular text for the dialogue.
    Keep it engaging and suitable for a TikTok audience.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const script = response.text();

    return NextResponse.json({ script });
  } catch (error) {
    console.error("Error generating script:", error);
    return NextResponse.json(
      { error: "Failed to generate script. Please try again." },
      { status: 500 }
    );
  }
}
