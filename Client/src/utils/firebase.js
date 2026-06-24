import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "speaklyai-15.firebaseapp.com",
  projectId: "speaklyai-15",
  storageBucket: "speaklyai-15.firebasestorage.app",
  messagingSenderId: "331243830955",
  appId: "1:331243830955:web:107b128a107aa7201601ee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };