"use client";

import { useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [script, setScript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScript(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setScript(data.script);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render text with bold markers
  const renderScript = (text: string) => {
    // Split by **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-pink-500 font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 sm:text-5xl">
            TikTok Script Generator
          </h1>
          <p className="mt-2 text-lg text-zinc-400">
            Turn your product into a viral sensation in seconds.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-zinc-300">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-zinc-100 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm px-4 py-3 placeholder-zinc-500"
              placeholder="e.g. SuperSlap Chop"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-zinc-300">
              Product Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-zinc-100 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm px-4 py-3 placeholder-zinc-500"
              placeholder="Describe your product's key features and benefits..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Generating...
              </>
            ) : (
              "Generate Script"
            )}
          </button>
        </form>

        {error && (
          <div className="rounded-md bg-red-900/50 p-4 border border-red-800">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-300">Error</h3>
                <div className="mt-2 text-sm text-red-200">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {script && (
          <div className="relative bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="absolute top-4 right-4">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors text-sm font-medium border border-zinc-700"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="prose prose-invert max-w-none whitespace-pre-wrap font-mono text-zinc-300 text-sm sm:text-base">
              {renderScript(script)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
