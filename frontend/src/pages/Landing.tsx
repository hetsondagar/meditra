import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/index");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Logo */}
      <img
        src="/logomain.png"
        alt="Meditra Logo"
        className="mb-8"
        style={{
          height: "6em",
          padding: "1.5em",
          filter: "drop-shadow(var(--shadow-glow))",
          transition: "filter 0.3s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.filter = "drop-shadow(var(--shadow-elevated))")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.filter = "drop-shadow(var(--shadow-glow))")
        }
      />

      {/* Heading */}
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-4"
        style={{ color: "hsl(var(--primary))" }}
      >
        Welcome to Meditra
      </h1>

      {/* Subtitle */}
      <p
        className="text-lg md:text-xl mb-8"
        style={{ color: "hsl(var(--secondary-foreground))" }}
      >
        Doctors cure, Meditra equips
      </p>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        className="px-8 py-3 text-lg font-semibold rounded-md shadow-lg transition-all duration-300"
        style={{
          background: "var(--gradient-primary)",
          color: "hsl(var(--primary-foreground))",
          boxShadow: "var(--shadow-medium)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "var(--primary-light)")}
        onMouseOut={(e) => (e.currentTarget.style.background = "var(--gradient-primary)")}
      >
        Get Started
      </button>
    </div>
  );
};
export default Landing;
