import { HiOutlineSparkles } from "react-icons/hi2";
function Login() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-6  lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <div
            className="w-60 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-100
          text-purple-600 text-sm  font-bold"
          >
            <HiOutlineSparkles />
            AI Voice Assistant Platform
          </div>
          <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-[#081028]">
            Build AI Assistants
            <span
              className="block text-transparent bg-clip-text
            bg-linear-to-r from-blue-500 to-pink-600"
            >
              For Any Website
            </span>
          </h1>
          <p></p>
        </div>

        {/* right */}
        <div></div>
      </div>
    </div>
  );
}

export default Login;
