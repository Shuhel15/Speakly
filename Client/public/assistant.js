(function () {

  // userdata
  const script = document.currentScript;
  const userId = script?.dataset.userId;

  const theme = "dark";

  let assistantConfig = null;

  //loading css
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "http://localhost:5173/assistant.css";
  document.head.appendChild(link);

  // create popup
  const popup = document.createElement("div");
  popup.className = `speakly-popup theme-${theme}`;

  popup.innerHTML = `
  
  <div class="speakly-overlay"></div>

  <div class="speakly-content">

  <div class="speakly-top">
  
  <div class="speakly-orb-wrap">

  <div class="speakly-orb-glow"></div>

  <div class="speakly-orb"></div>
  </div>

  <h2 class="speakly-title">Hello! I'm speakly AI</h2>

  <p class="speakly-sub">Your Smart voice assistant <br/> Ask anything about your website.</p>

  <div class="speakly-status">Tap button to Speak</div>

  <div class="speakly-wave">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  </div>


  <!--User text-->
  <div class="speakly-user-text">

  </div>
  
  <!--AI text-->
  <div class="speakly-ai-text">

  </div>
  </div>


  <div class="speakly-bottom">

  <button class="speakly-mic">
  <img src="http://localhost:5173/mic.svg" alt="mic" class="speakly-mic-icon" />
  </button>
  </div>
  <p class="lower-text">By Speakly AI</p>

  </div>



  `;

  document.body.appendChild(popup);

  // floating buttton

  const button = document.createElement("button");
  button.className = `speakly-btn theme-${theme}`;
  button.innerHTML = `<img src="http://localhost:5173/logo.png" alt="logo" class="speakly-button-icon" />`;

  document.body.appendChild(button);

  // toggle popup
  let open = false;
  button.onclick = () => {
    open = !open;
    popup.style.display = open ? "flex" : "none";
  }



  // load assistant

  const loadAssistant = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/assistant/config/${userId}`);

      const data = await res.json();

      if (data) {
        assistantConfig = data.user;
        applyConfig();
      }
    } catch (error) {
      console.error("Failed to load assistant config:", error);
    }
  }

  const applyConfig = () => {
    if (!assistantConfig) return;

    popup.className = `speakly-popup theme-${assistantConfig.theme}`;
    button.className = `speakly-btn theme-${assistantConfig.theme}`;
    const title = popup.querySelector(".speakly-title");
    title.innerHTML = `Hello! I'm ${assistantConfig.assistantName || "speakly AI"}`;
    const sub = popup.querySelector(".speakly-sub");
    sub.innerHTML = ` Welcome to ${assistantConfig.businessName}<br/> Ask anything about this website.`;

  }
  loadAssistant();


  const status = popup.querySelector(".speakly-status");
  const wave = popup.querySelector(".speakly-wave");
  const userText = popup.querySelector(".speakly-user-text");
  const aiText = popup.querySelector(".speakly-ai-text");
  const mic = popup.querySelector(".speakly-mic");

  // text-speech

const speak = (text) => {
  window.speechSynthesis.cancel();

  //show ai response
  aiText.innerText = text;

  status.innerText = "AI Speaking...";

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "hi-IN";
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;

  speech.onend = () => {
    status.innerText = "Tap button to Speak";
    wave.style.opacity = "0";
  };

  window.speechSynthesis.speak(speech);
};


  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    mic.onclick = () => {
      status.innerText = "Listening...";
      userText.innerText = "";
      aiText.innerText = "";
      wave.style.opacity = "1";
      recognition.start();
    }

    recognition.onresult = async (e) => {
      const text = e.results[0][0].transcript;
      userText.innerText = `You: ${text}`;
      recognition.stop();

      setTimeout(async () => {
        try {
          status.innerText = "Thinking...";

          const response = await fetch("http://localhost:5000/api/assistant/ask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              message: text,
              currentPath: window.location.pathname
            }),
          });

          const data = await response.json();
          console.log("AI Response:", data);
          if (data.success) {
            if (data.action === "navigate") {
              speak(data.response);
              setTimeout(() => {
                window.location.href = data.path;
              }, 2000);

            } else {
              speak(data.aiResponse);
            }
          } else {
            speak("Sorry, I couldn't process your request.");
          }
        } catch (error) {
          console.log(error);
          speak("Server Error. Please try again later.");
        }
      }, 700)

    }

    recognition.onerror = (e) => {
      status.innerText = "Tap button to Speak";
      wave.style.opacity = "0";
      console.error("Speech recognition error:", e.error);
    }
  } else {
    status.innerText = "Speech recognition not supported.";
  }

})();
