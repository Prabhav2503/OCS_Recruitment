import React from "react";
import "./App.css";
import Login from "./login";  // ✅ Import Login component

function App() {
  return (
    <div className="app-container">
      {/* Upper-right corner logo */}
      <img src="/logo.png" alt="Logo" className="logo" />

      {/* Main Content */}
      <div className="content">
        <Login />  {/* ✅ Include the login form */}
      </div>
    </div>
  );
}

export default App;
