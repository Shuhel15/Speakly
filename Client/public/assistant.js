(function () {
  // userdata

  const script = document.currentScript;
  const userId = script?.dataset.userId;

  const theme = "neon";

  const assistantConfig = null;

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
  button.onclick=()=>{
    open = !open;
      popup.style.display = open ? "flex" : "none";
  }
})();
