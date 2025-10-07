import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";

// Рендер приложений
ReactDOM.createRoot(
  document.querySelector("#modal-incoming-call") as HTMLElement
).render(<App />);
