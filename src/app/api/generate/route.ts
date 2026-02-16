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
      if (process.env.NODE_ENV === "development") {
        console.warn("GEMINI_API_KEY not found. Using mock response.");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return NextResponse.json({
          script: `**[Scene: Mock Studio]**\n\n(This is a mock response because GEMINI_API_KEY is missing)\n\n**Host:** Hey! Did you know you can test this app without an API key?\n\n**Guest:** No way! That's awesome.\n\n**Host:** Yeah, just set it up in .env.local when you're ready for the real magic!\n\n**Guest:** (Winks at camera) Sweet!`
        });
      }
      return NextResponse.json(
        { error: "Configuration Error: GEMINI_API_KEY is not defined. Please add it to your .env.local file." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
