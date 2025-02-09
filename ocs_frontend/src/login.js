import React, { useState } from "react";
import axios from "axios";
import "./login.css"; // Import CSS for styling

function Login() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setUserData(null);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        userid,
        password,
      });

      setUserData(response.data);
    } catch (err) {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>OCS User Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User ID"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {userData && (
          <div className="user-info">
            <h3>Welcome, {userData.userid || "Admin"}!</h3>
            {Array.isArray(userData) ? (
              <div>
                <h4>All Users:</h4>
                <ul>
                  {userData.map((user, index) => (
                    <li key={index}>
                      {user.userid} - {user.role} - {user.password_hash}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Role: {userData.role} <br /> Password Hash: {userData.password_hash}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

