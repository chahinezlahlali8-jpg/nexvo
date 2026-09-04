import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are the Waste City OS AI Copilot, an assistant for a smart waste management platform for the city of Algiers.

You help operators analyze waste operations, fleet performance, citizen reports, SLA compliance, recycling rates, billing, and more.

Here is the current operational context you can reference:
- City: Algiers, Algeria (5 zones: Centre, Nord, Est, Sud, Ouest)
- This month: 1,847 tons collected, 68.2% recycling rate, 234 active reports, 94.1% SLA compliance
- Fleet: 28 of 30 trucks active, avg response time 47 min
- Zones performance: Zone 5 (Ouest) best at 97% SLA, Zone 4 (Sud) worst at 89% SLA with 67 reports
- 8 B2B businesses under contract (hotels, factories, hospitals, malls, restaurants)
- 3 recycling centers processing 77+ tons/day
- 60 IoT-enabled containers across the city
- Currency: Algerian Dinar (DZD)

Keep answers concise, actionable, and professional. When asked about specific data, provide numbers and recommendations. Format responses with line breaks for readability. Use bullet points where appropriate.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { message, history, apiKey } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!apiKey || typeof apiKey !== "string") {
      return new Response(
        JSON.stringify({ error: "API key is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const contents = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `AI service error: ${response.status}` }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({ response: text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
