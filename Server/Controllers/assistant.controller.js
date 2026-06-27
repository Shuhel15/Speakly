import { generativeGeminiResponse } from '../Configs/gemini.js';
import User from '../Models/user.model.js';
export const getAssistantConfig = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-geminiApiKey");

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: "Assistant Config data", user });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve assistant confi' });
  }
}

export const askAssistant = async (req, res) => {
  try {
    const { message, userId } = req.body;
    if (!message || !userId) {
      return res.status(400).json({ error: "Message and userId are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.geminiApiKey) {
      return res.status(404).json({ message: "Gemini API key is not added." });
    }

    if (user.plan === "free" && user.totalMessages >= user.requestLimitLimit) {
      return res.status(400).json({ message: "Free limit exceeded. Please upgrade your plan." });
    }

    if (user.plan === "pro" && new Date(user.proExpiresAt) < new Date()) {
      user.plan = "free";
      await user.save();
      return res.status(400).json({ message: "Pro plan expired. Please upgrade your plan." });

    }

    const cleanedMessage = message.toLowerCase();

    if (user.enableNavigation) {
      //navigation commands
      const navigationKeyWords = ["open", "show", "take me", "navigate", "go to", "go", "start", "visit"];
    }

    //check navigation intent
    const wantsNavigation = navigationKeyWords.some((word) => cleanedMessage.startsWith(word));

    //user wants to navigate to a page
    if (wantsNavigation) {
      //find matching page 
      const matchedPage = user.pages.find((page) =>
        page.keywords.some((keyword) => cleanedMessage.includes(keyword.toLowerCase()))
      )
    }

    //page found
    if (matchedPage) {
      //already open
      if (req.body.currentPath === matchedPage.path) {

        return res.json({
          success: true,
          response: `You are already on the ${matchedPage.name} page.`,
        })
      }

      //navigate to page
      return res.json({
        success: true,
        action: "navigate",
        path: matchedPage.path,
        response: `Opening ${matchedPage.name}`,

      })
    }

    const prompt =
     `You are ${user.assistantName}.
     A helpful AI assistant for Business Name:${user.businessName}.
     Business Type:${user.businessType}.
     Business Description:${user.businessDescription}.
     Assistant Tone : ${user.tone}.

     Rules:
     - Keep responses under 15 words.
     - Give fast direct responses.
     - Talk naturally.
     - Behave like smart human assistant.
     - Avoid long explanations.
     - Keep responses short for quick voice playback.
     
     User Query: ${message}`;

     const aiResponse = await generativeGeminiResponse(
      prompt,
      user.geminiApiKey,
      user
     )
     if(user.plan === "free"){
     user.totalMessages += 1;
     await user.save();
     }
     return res.json({ success: true, aiResponse });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success : false, message: 'AI Assistant Error' });
  }
}
