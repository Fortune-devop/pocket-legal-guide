
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react"
import App from './App.tsx'
import './index.css'

// Import environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xlcmsuYm9hY29uc3RyaWN0b3IuMTgtNjQuY2xlcmsuYWNjb3VudHMuZGV2JA";

// This is a development key that will allow the app to run in development mode
// Replace it with your actual key in production using environment variables
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key")
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={(to) => window.location.href = to}>
    <App />
  </ClerkProvider>
);
