import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Header from "./components/Header";

function App() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "",
  );

  const handleLogin = (userId, userName) => {
    navigate("/home");
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
    setUserId(userId);
    setUserName(userName);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setUserName("");
    setUserId("");
  };

  return (
    <>
      <Header userName={userName} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={
            localStorage.getItem("userId") ? (
              <HomePage userId={userId} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
