import { useState } from "react";
import { FaPlus, FaRegCopy } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { CLIENT_URL, ServerUrl } from "../App.jsx";
import tost from "react-hot-toast";

const THEMES = ["light", "dark", "glass", "neon"];
const TONES = ["friendly", "professional", "formal"];
function Builder({ user, setUser }) {
  const initialTheme = (user?.theme || "dark").toLowerCase();
  const initialTone = (user?.tone || "friendly").toLowerCase();

  const [editAssistant, setEditAssistant] = useState(!user?.isSetupComplete);
  const [assistantName, setAssistantName] = useState(user?.assistantName || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [businessType, setBusinessType] = useState(user?.businessType || "");
  const [businessDescription, setBusinessDescription] = useState(
    user?.businessDescription || "",
  );

  const [theme, setTheme] = useState(initialTheme);
  const [tone, setTone] = useState(initialTone);

  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "");

  const [pages, setPages] = useState(user?.pages || []);
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setPageKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  //function to add a new page to the pages array
  const addPage = () => {
    if (!pageName || !pagePath) return;

    const newPage = {
      name: pageName,
      path: pagePath,
      keywords: pageKeywords.split(",").map((keyword) => keyword.trim()),
    };
    setPages([...pages, newPage]);
    setPageName("");
    setPagePath("");
    setPageKeywords("");
  };

  const removePage = (index) => {
    const updatedPages = pages.filter((_, i) => i !== index);
    setPages(updatedPages);
  };

  const saveAssistant = async () => {
    setLoading(true);
    try {
      const data = {
        assistantName,
        businessName,
        businessType,
        businessDescription,
        theme,
        tone,
        geminiApiKey,
        pages,
      };

      const res = await axios.post(
        ServerUrl + "/api/user/save-assistant",
        data,
        { withCredentials: true },
      );
      setUser(res.data.user);
      setEditAssistant(false);
      tost.success("Assistant saved successfully!");
      setLoading(false);
    } catch (error) {
      tost.error("Error saving assistant. Please try again.");
      console.error("Error saving assistant:", error);
      setLoading(false);
    }
  };

  const remainingMessages = Math.max(
    0,
    (user?.requestLimit || 0) - (user?.totalMessages || 0),
  );

  const remaininDays = user?.proExpiresAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>`;

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className=" text-3xl font-bold text-[#081028]">
            Assistant Builder
          </h2>
          <p className="text-gray-500 mt-1">Customize your virtual assistant</p>
        </div>
        {user.isSetupComplete && !editAssistant && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
            <p className="text-sm text-gray-400">Assistant</p>
            <h2 className="text-3xl font-bold text-[#081028] mt-1">
              {user.assistantName}
            </h2>
            <p className="text-gray-500 mt-3 leading-7">
              Your Assistant is ready to assist you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="rounded-2xl border border-gray-100 bg-[#f8fafc]">
                <p className="text-sm text-gray-400 px-2 pt-1">Current Plan</p>
                <h2 className=" text-xl font-bold text-[#081028] mt-1 px-2 pb-1 capitalize">
                  {user.plan}
                </h2>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[#f8fafc]">
                <p className="text-sm text-gray-400 px-2 pt-1">Gemini Status</p>
                <h2
                  className={` text-xl font-bold mt-1 px-2 pb-1 capitalize
                  ${user?.geminiStatus === "active" ? "text-emerald-600" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-amber-500"}`}
                >
                  {user.geminiStatus}
                </h2>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[#f8fafc]">
                <p className="text-sm text-gray-400 px-2 pt-1">
                  {user?.plan === "free" ? "Messages Left" : "Plan Expiry"}
                </p>
                <h2 className=" text-xl font-bold text-[#081028] mt-1 px-2 pb-1 capitalize">
                  {user?.plan === "free"
                    ? remainingMessages
                    : `${remaininDays} days left`}
                </h2>
              </div>
            </div>
            <div className="mt-7 ">
              <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-400 p-4">
                <p className="text-sm font-semibold text-amber-900">
                  Where to paste this script?
                </p>
                <p className="text-sm text-amber-700 mt-2 leading-6">
                  Paste this script before the closing{" "}
                  <span className="font-semibold">{"</body>"}</span> tag of your
                  website HTML file.
                  <br />
                  <br />
                  Example:
                </p>
                <pre
                  className="mt-3 bg-[#0b1020] text-emerald-400 rounded-xl 
                p-3 text-xs font-mono overflow-x-auto"
                >
                  {`<body> 

Your Website Content 

<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script> 

</body>`}
                </pre>
              </div>
              <p className="text-sm font-medium text-[#081028] mt-3 mb-3">
                Embed Code
              </p>
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={embedCode}
                className="w-full h-20 bg-[#0b1020] text-emerald-400 rounded-2xl
              p-4 text-sm font-mono resize-none outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(embedCode);
                  tost.success("Copied!");
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white
              flex items-center justify-center"
              >
                <FaRegCopy />
              </button>
            </div>
            <button
              onClick={() => setEditAssistant(true)}
              className="mt-6 h-12 px-6 rounded-2xl bg-linear-to-r 
            from-green-500 to-emerald-500 text-white font-medium"
            >
              {" "}
              Edit Assistant
            </button>
          </div>
        )}
        {editAssistant && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border-gray-100 border shadow-md">
              <h2 className="text-lg font-semibold mb-5 ">Basic Information</h2>
              <div className="space-y-4">
                <input
                  onChange={(e) => setAssistantName(e.target.value)}
                  value={assistantName}
                  type="text"
                  placeholder="Assistant Name"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                />

                <input
                  onChange={(e) => setBusinessName(e.target.value)}
                  value={businessName}
                  type="text"
                  placeholder="Business Name"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                />

                <input
                  onChange={(e) => setBusinessType(e.target.value)}
                  value={businessType}
                  type="text"
                  placeholder="Business Type"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                />

                <textarea
                  rows={4}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  value={businessDescription}
                  type="text"
                  placeholder="Business Description"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none"
                />
              </div>
            </div>
            <div
              className="bg-white rounded-3xl border border-gray-100
          shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold mb-5">Appearance</h2>
              <div>
                <label className="text-sm text-gray-600 mb-3 block">
                  Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setTheme(item)}
                      className={`py-3 rounded-2xl
                  border-2 capitalize ${
                    theme === item
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 "
                  }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="text-sm text-gray-600 mb-3 block">
                  Assistant Tone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TONES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setTone(item)}
                      className={`py-3 rounded-2xl
                  border-2 capitalize ${
                    tone === item
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 "
                  }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border-gray-100 border shadow-md">
              <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold">Gemini API key </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Add your Gemini API key to power your assistant
                  </p>
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-2xl bg-linear-to-r from-green-500 to-emerald-500 text-white text-sm font-medium
               hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Get API Key
                </a>
              </div>
              <input
                type="password"
                placeholder="AIza..."
                onChange={(e) => setGeminiApiKey(e.target.value)}
                value={geminiApiKey}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3"
              />
              <p className="text-xs text-gray-400 mt-3 leading-6">
                Your API key is securely stored and will not be shared with
                anyone & only used for generating AI responses.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold">Navigation Pages</h2>
                  <p className="text-sm text-gray-400">
                    Assistant can redirect users
                  </p>
                </div>
                <button
                  onClick={addPage}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white text-sm
              hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <FaPlus />
                  Add
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Page Name"
                  onChange={(e) => setPageName(e.target.value)}
                  value={pageName}
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="/route"
                  onChange={(e) => setPagePath(e.target.value)}
                  value={pagePath}
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                />
                <input
                  type="text"
                  placeholder="Command(eg:home etc.)"
                  onChange={(e) => setPageKeywords(e.target.value)}
                  value={pageKeywords}
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                />
              </div>
              <div className="mt-5 space-y-3">
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 border border-gray-100 rounded-2xl p-4"
                  >
                    <div>
                      <p className="font-medium">{page.name}</p>
                      <p className="text-sm text-gray-400">{page.path}</p>
                    </div>
                    <button
                      onClick={() => removePage(index)}
                      className="text-red-500"
                    >
                      <BsTrash3 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={saveAssistant}
              disabled={loading || !assistantName|| !businessName|| !businessType||!businessDescription|| !geminiApiKey}
              className="w-full h-14 rounded-2xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold hover:scale-[1.02] transition-all cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : user.isSetupComplete
                  ? "Update Assistant"
                  : "Save Assistant"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Builder;
