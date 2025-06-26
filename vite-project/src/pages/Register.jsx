import React, { useState } from "react";

async function registerUser(user) {
    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Optionally, fake API call
    try {
        const res = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log('Fake API user added:', data);
    } catch (err) {
        console.log('Fake API error:', err);
    }
}

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const user = {
                email: form.email,
                username: form.name,
                password: form.password,
                name: {
                    firstname: form.name.split(" ")[0] || "",
                    lastname: form.name.split(" ")[1] || "",
                },
                address: {
                    city: "",
                    street: "",
                    number: 0,
                    zipcode: "",
                    geolocation: {
                        lat: "",
                        long: "",
                    },
                },
                phone: "",
            };
console.log("Registering user:", user);
            // Save user to localStorage and fake API
           await registerUser(user);

            setSuccess("Registration successful!");
            setForm({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                        <label className="block text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-600 text-sm text-center">{success}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;