import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LoginSetup from "./components/LoginSetup";
import SystemMonitor from "./components/SystemMonitor"; // Make sure this path is correct

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route shows the login form */}
        <Route path="/" element={<LoginForm />} />
        
        {/* Optional pre-login setup screen */}
        <Route path="/setup" element={<LoginSetup />} />

        {/* Post-login dashboard */}
        <Route path="/dashboard" element={<SystemMonitor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;