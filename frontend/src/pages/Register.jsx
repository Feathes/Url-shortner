import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'   // apne project ke hisaab se path badlo
import '../style/Auth.css'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [localError, setLocalError] = useState("")

    const navigate = useNavigate()
    const { handleRegister, isAuthenticated, loading, error, setError } = useAuth()

    // Register ho gaya (aur token mil gaya) to home par bhej do
    useEffect(() => {
        if (isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email.trim() || !password || !username) {
            setLocalError("All fields are required")
            return
        }
        if (password.length < 6) {
            setLocalError("Password is too short minimm 6 characters are required")
            return
        }

        setLocalError("")
        setError("")
        try {
            await handleRegister(username, email.trim(), password)
        } catch (err) {
            setLocalError(err.response?.data?.error || "Register nahi ho paya")
        }
    }

    const message = localError || error

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Account banao</h1>
                <p className="auth-subtitle">Apne saare short links ek jagah save karo.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="username">Username</label>
                        <input
                            name='username'
                            id="username"
                            type="text"
                            className="auth-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            autoComplete="email"
                        />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="email">Email</label>
                        <input
                            name='email'
                            id="email"
                            type="email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="password">Password</label>
                        <div className="auth-password">
                            <input
                                name='password'
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className="auth-toggle"
                                onClick={() => setShowPassword((s) => !s)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>


                    {message && <p className="auth-error">{message}</p>}

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "Account creating..." : "Register"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                    <Link to="/" className="auth-guest">use without login with limited features</Link>
                </p>
            </div>
        </div>
    )
}

export default Register