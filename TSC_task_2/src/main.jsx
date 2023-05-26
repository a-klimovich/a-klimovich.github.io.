import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import { validateMessages } from "./config";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider form={{ validateMessages }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
