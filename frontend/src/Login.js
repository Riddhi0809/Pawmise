import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ SLIDESHOW IMAGES
  const images = [
      "/images/pet1.png",
      "/images/pet2.jpg",
      "/images/pet3.jpg",
      "/images/pet4.jpg",
      "/images/pet5.jpg",
      "/images/pet6.png",
  ];

  // ✅ SLIDESHOW EFFECT
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const API_URL = "http://localhost:5000/api";
    const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Authentication failed");
        return;
      }

      if (isLogin) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("username", form.username);
        navigate("/home");
      } else {
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
        setForm({ username: "", password: "" });
      }

    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="login-page split-layout">
      
      {/* LEFT IMAGE SLIDESHOW */}
      <div className="login-image">
        <img
          src={images[currentSlide]}
          alt="Pet"
          key={currentSlide}
        />
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="login-right">
        <form className="login-form card" onSubmit={handleSubmit}>
          <h2>{isLogin ? "LOGIN" : "SIGN UP"}</h2>

          <label>Username</label>
          <input
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="login-btn" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {error && <div className="error-text">{error}</div>}
          {success && <div style={{ color: "green", textAlign: "center" }}>{success}</div>}

          <p className="switch-text">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setSuccess("");
                }}>
                  SIGN UP
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setSuccess("");
                }}>
                  LOG IN
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
