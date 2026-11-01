import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../style/Auth.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState("")

  const navigate = useNavigate()
  const { handleLogin, isAuthenticated, loading, error, setError } = useAuth()

  // Login ho gaya to home page par bhej do
  useEffect(() => {
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password) {
      setLocalError("all field is required")
      return
    }

    setLocalError("")
    setError("")
    try {
      await handleLogin(email.trim(), password)
    } catch (err) {
      setLocalError(err.response?.data?.error || "user and passwor d is inccorect")
    }
  }

  const message = localError || error

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Login and access all links</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={message ? "auth-input has-error" : "auth-input"}
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
                id="password"
                type={showPassword ? "text" : "password"}
                className={message ? "auth-input has-error" : "auth-input"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
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
            {loading ? "Login..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Create account</Link>
          <Link to="/" className="auth-guest">Use without account with limited features</Link>
        </p>
      </div>
    </div>
  )
}

export default Login 