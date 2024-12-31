import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./components/InputPage";
import LeaveApplication from "./components/LeaveApplication";
import "./styles.css";

function App() {
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPage setFormData={setFormData} />} />
        <Route path="/leave-application" element={<LeaveApplication formData={formData} />} />
      </Routes>
    </Router>
  );
}

export default App;
