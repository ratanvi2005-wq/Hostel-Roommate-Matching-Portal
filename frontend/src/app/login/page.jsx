"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    // Yahan backend login API call kar sakte ho
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <p>Welcome back! Please login to your account.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="signup">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 20px;
        }

        .login-box {
          width: 100%;
          max-width: 400px;
          background: white;
          padding: 35px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        h1 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
        }

        .login-box > p {
          text-align: center;
          color: #777;
          margin-bottom: 25px;
        }

        .input-group {
          margin-bottom: 18px;
        }

        label {
          display: block;
          margin-bottom: 7px;
          font-weight: 600;
          color: #333;
        }

        input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 15px;
          box-sizing: border-box;
          outline: none;
        }

        input:focus {
          border-color: #667eea;
        }

        .forgot {
          text-align: right;
          margin-bottom: 20px;
        }

        .forgot a,
        .signup a {
          color: #667eea;
          text-decoration: none;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #667eea;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        button:hover {
          background: #5568d9;
        }

        .signup {
          margin-top: 20px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}