
import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const PUBLISHABLE_KEY = "pk_test_Y2xvc2UtbWlubm93LTEyLmNsZXJrLmFjY291bnRzLmRldiQ";
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
