import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

Function.prototype.safe = function (...args) {
  try {
    const value = this(...args);
    return { value, error: null };
  } catch (error) {
    return { value: null, error };
  }
};
Function.prototype.safeAsync = async function (...args) {
  try {
    const value = await this(...args);
    return { value, error: null };
  } catch (error) {
    return { value: null, error };
  }
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
