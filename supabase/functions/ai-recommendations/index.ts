import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    
    if (!message) {
      throw new Error("Message is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing AI recommendation request:", message);

    // Build conversation with system prompt
    const messages = [
      {
        role: "system",
        content: `You are an AI travel assistant for Jharkhand Tourism. You help tourists discover and plan their trips to Jharkhand, India.

Key destinations to recommend:
- Netarhat: Hill station known as "Queen of Chotanagpur" with stunning sunsets
- Betla National Park: Wildlife sanctuary with elephants, tigers, and diverse flora
- Hundru Falls: Spectacular 98-meter waterfall surrounded by forests
- Baidyanath Temple, Deoghar: Sacred Jyotirlinga temple with rich spiritual significance
- Patratu Valley: Scenic valley with reservoir and beautiful landscapes
- Jonha Falls: Beautiful waterfall also known as Gautamdhara
- Ranchi: Capital city with Tagore Hill, Rock Garden, and Jagannath Temple
- Parasnath Hills: Important Jain pilgrimage site with 24 Jain temples

Cultural highlights:
- Tribal heritage and authentic handicrafts (Dokra art, handwoven textiles)
- Traditional dance and music festivals
- Community homestays with tribal families
- Local cuisine and food experiences

Activities:
- Wildlife safaris and bird watching
- Trekking and nature walks
- Temple visits and spiritual tourism
- Shopping for tribal handicrafts
- Photography tours
- Adventure sports (rock climbing, paragliding in some areas)

Provide personalized recommendations based on user interests, budget, duration, and preferences. Always be helpful, informative, and enthusiastic about Jharkhand's beauty and culture.`
      },
      ...(conversationHistory || []),
      {
        role: "user",
        content: message
      }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received successfully");

    return new Response(
      JSON.stringify({ 
        recommendation: data.choices[0].message.content,
        conversationHistory: [
          ...(conversationHistory || []),
          { role: "user", content: message },
          { role: "assistant", content: data.choices[0].message.content }
        ]
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    } catch (error) {
      console.error("Error in ai-recommendations function:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get recommendation";
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  });
