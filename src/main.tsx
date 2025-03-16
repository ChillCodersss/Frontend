import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "@/components/ui/provider"
import "./index.css";
import ConfirmButton from "./components/common/ConfirmButton.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfirmButton />} />
      </Routes>
      
    </BrowserRouter>
    </Provider> 
  </StrictMode>
);
