const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent";

export const generativeGeminiResponse = async ({
  prompt,
  apikey,
  user
}) => {
  try {

    if (!apikey) {
      throw new Error("Gemini API key is missing. Please provide a valid API key.");
    }


    const response = await fetch(`${Gemini_URL}?key=${apikey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    })

    if (!response.ok) {
      //invalid api key
      if (response.status === 400 || response.status === 401) {
        user.geminiStatus = "invalid";
        await user.save();
      }

      //Quota exceeded
      if (response.status === 429) {
        user.geminiStatus = "quota_exceeded";
        await user.save();
      }

      const err = await response.json();
      throw new Error(err);

    }

    //success satus
    user.geminiStatus = "active";
    await user.save();

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini API";

    if (!text) {
      throw new Error("No response from Gemini API");
    }
    return text.trim();
  } catch (error) {
    console.error("Gemini Fetch Error:", error.message);
    throw new Error(
      "Gemini API fetch failed"
    );
  }
}