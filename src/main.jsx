import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Employee from "./context/employeContext.jsx";
import Admin from "./context/adminContext.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Admin>
        <Employee>
          <App />
        </Employee>
      </Admin>
    </BrowserRouter>
  </StrictMode>
);
