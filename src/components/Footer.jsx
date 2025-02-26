import { Github, Instagram, Linkedin, Moon, Sun } from "lucide-react";
import "../css/global.css";
import "../css/Footer.css";
import { useState, useEffect } from "react";

export default function Footer() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : false;
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} APOD (
                    <span className="app-name">AstroPic</span>).
                    All rights reserved.
                </p>
                <div className="social-links">
                    <button className="btn theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <a href="https://www.linkedin.com/in/reon-fernandes/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="footer-icon" />
                    </a>
                    <a href="https://github.com/FernandesReon" target="_blank" rel="noopener noreferrer">
                        <Github className="footer-icon" />
                    </a>
                    <a href="https://www.instagram.com/reonfernandes_7/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="footer-icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
}