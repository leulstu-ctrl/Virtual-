# TikTok Script Generator

A Next.js application that generates funny, viral 30-second TikTok scripts for products using the Gemini API.

## Features

- **Simple UI:** Input Product Name and Description.
- **AI Generation:** Uses Google's Gemini 1.5 Flash model.
- **Formatted Output:** Bold scene headers and clear dialogue.
- **Copy to Clipboard:** Easy one-click copy button.
- **Dark Mode:** Sleek, modern design.

## Prerequisites

- Node.js (v18 or later)
- A Google Gemini API Key (Get one [here](https://aistudio.google.com/app/apikey))

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Copy `.env.local.example` to `.env.local` and add your Gemini API key:

    ```bash
    cp .env.local.example .env.local
    ```

    Edit `.env.local`:

    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the app:**

    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI:** Google Generative AI (Gemini)

## License

MIT
