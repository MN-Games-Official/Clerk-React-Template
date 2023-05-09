import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/auth.css";
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
