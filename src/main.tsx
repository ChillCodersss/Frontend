import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import ConfirmButton from "./components/common/ConfirmButton";
import InputBox from "./components/common/inputbox";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <InputBox
              label={"scaca"}
              value={"acac"}
              onChange={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route
          path="/confirm"
          element={<ConfirmButton >یارو</ConfirmButton>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
