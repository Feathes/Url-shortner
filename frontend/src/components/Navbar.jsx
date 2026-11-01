import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'   // apne project ke hisaab se path badlo
import '../style/navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const { isAuthenticated, handleLogout } = useAuth()

    const onLogout = async () => {
        await handleLogout()
        window.alert("Logout successful")
        window.location.reload() // Refresh the page to update the UI
        navigate("/")
    }

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <span className="navbar-logo-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
                            <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
                        </svg>
                    </span>
                    <span className="navbar-logo-text">ShortLink</span>
                </Link>

                <nav className="navbar-right">
                    <NavLink to="/" end className="nav-link">Home</NavLink>

                    {isAuthenticated ? (
                        <button className="nav-btn nav-btn-outline" onClick={onLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                            <Link to="/register" className="nav-btn">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar