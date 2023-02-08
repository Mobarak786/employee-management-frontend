import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagersDashboard from "./components/ManagersDashboard";
import UsersDashboard from "./components/UsersDashboard";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="max-w[1400px] h-auto bg-white ">
      <Router>
        <Routes>
          <Route path={"/"} element={<LoginForm />} />
          <Route path={"/UsersDashboard"} element={<UsersDashboard />} />
          <Route path={"/ManagersDashboard"} element={<ManagersDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
