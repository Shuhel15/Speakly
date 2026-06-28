import { Navigate } from "react-router-dom";

function Footer() {
  return (

     <footer className="bg-[#081028] px-6 py-10">
        <div className="max-w-6xl mx-auto text-center flex flex-col sm:flex-row sm:text-left justify-between items-center gap-5 ">
          <div>
            {" "}
            <div
              onClick={() => Navigate("/")}
              className="flex items-center gap-1"
            >
              <img
                src="/logo.png"
                alt="logo"
                className="w-auto h-9 rounded-full"
              />
              <h1 className="text-xl font-bold text-gray-200">
                Speakly<span className="text-green-500"> AI</span>
              </h1>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Voice AI assistant for mordern websites.
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            ©{new Date().getFullYear()} Speakly AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm text-shadow-mauve-200">
            Made by Shuhel Ahmed with ❤️
          </p>
        </div>
      </footer>
  )
}

export default Footer
