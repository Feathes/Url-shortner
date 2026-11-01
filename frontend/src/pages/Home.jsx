import React, { useEffect, useState } from 'react'
import axios from "axios"
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../hooks/useAuth.js'
import { useUrl } from '../hooks/useUrl.js'
import Loader from '../components/Loader.jsx'



const Home = () => {
    const [longUrl, setLongUrl] = useState("")
    const [shortcode, setShortcode] = useState("")
    const [customUrl, setCustomUrl] = useState("")
    const [history, setHistory] = useState([])

    const { isAuthenticated, error, loading, setError } = useAuth()
    const { handleGetAllUrls, handleCreateUrl } = useUrl()



    useEffect(() => {
        if (isAuthenticated) {
            handleGetAllUrls().then((data) => {
                setHistory(Array.isArray(data) ? data : (data?.urls ?? []))
            }).catch((err) => {
                console.log("error fetching history:", err)
            })
        }
    }, [isAuthenticated])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await handleCreateUrl(longUrl, customUrl)

            if (!res) return                    // kuch nahi aaya to aage mat badho

            const newItem = {
                id: res._id ?? res.shortUrl,      // _id na ho to shortUrl ko key bana lo
                longUrl: res.longUrl ?? longUrl,  // backend na bheje to input wali value
                shortUrl: res.shortUrl,
            }

            setHistory((prev) => [newItem, ...prev])
            setShortcode(res.shortUrl)
            setError("")
            setLongUrl("")
            setCustomUrl("")
        } catch (error) {
            console.log("error in creating url", error)                    // error ko pakda, ab "Uncaught" nahi aayega
        }
    }



    if (loading) return <Loader />
    return (

        <div className="app">
            <h1 className="title">URL Shortener</h1>
            <p className="subtitle">Lamba link paste karo, chhota link pao.</p>
            {/* Can be anything instead of `maxWidth` that limits the width. */}


            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={error ? "input input-error" : "input"}
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Long URL"
                />
                <input
                    type="text"
                    className="input"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Custom name (optional)"
                />
                <button type="submit" className="btn">Shorten</button>
            </form>

            {error && <p className="error-text">{error}</p>}

            {shortcode && (
                <h2 className='history-title'>Current link</h2>
            )}

            {shortcode && (

                <div className="result">
                    <a className="result-link" href={shortcode} target="_blank" rel="noopener noreferrer">{shortcode}</a>
                    <div className="qr-wrap"><QRCodeSVG value={shortcode} size={72} /></div>
                    <button className="btn-copy" onClick={() => navigator.clipboard.writeText(shortcode)}>Copy</button>
                </div>
            )}

            <h2 className="history-title">Recent links</h2>

            {history.length === 0 ? (
                <p className="empty">you did not create any links first create the links</p>
            ) : (
                <ul className="history-list">
                    {history.map((url) => (
                        <li className="history-item" key={url.id}>
                            <div className="history-links">
                                <a className="short-link" target="_blank" rel="noopener noreferrer" href={url.shortUrl}>
                                    {url.shortUrl}
                                </a>

                                <a className="long-link" target="_blank" rel="noopener noreferrer" href={url.longUrl}>
                                    {url.longUrl}
                                </a>
                            </div>
                            <div className="qr-wrap">
                                <QRCodeSVG value={url.shortUrl} size={64} />
                            </div>
                            <button className="btn-copy" onClick={() => navigator.clipboard.writeText(url.shortUrl)}>
                                Copy link
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Home