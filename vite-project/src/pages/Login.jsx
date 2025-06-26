import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // Success message state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Helper: Check user in localStorage if API login fails
    const checkLocalUser = (username, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === username && u.password === password
        );
        if (user) {
            localStorage.setItem("token", "fake-jwt-token");
            return true;
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: form.email,
                    password: form.password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    setSuccess("Login successful! Redirecting to Product...");
                    setTimeout(() => {
                        navigate("/product");
                    }, 1500);
                } else {
                    const found = checkLocalUser(form.email, form.password);
                    if (found) {
                        setSuccess("Login successful! Redirecting to Product...");
                        setTimeout(() => {
                            navigate("/product");
                        }, 1500);
                    } else {
                        window.alert("Login failed: Invalid credentials.");
                        setError("Invalid credentials. Please try again.");
                    }
                }
            } else {
                const found = checkLocalUser(form.email, form.password);
                if (found) {
                    setSuccess("Login successful! Redirecting to Product...");
                    setTimeout(() => {
                        navigate("/product");
                    }, 1500);
                } else {
                    window.alert("Login failed: Invalid credentials.");
                    setError("Invalid credentials. Please try again.");
                }
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-600 text-sm text-center">{success}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;