import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import About from "./components/About/About";
import GlobalStyles from "./styles/GlobalStyles";
import UserGuide from "./components/Guide/UserGuide";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-guide" element={<UserGuide />} />
      </Routes>
    </Router>
  );
}

export default App;
