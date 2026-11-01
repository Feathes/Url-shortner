import { nanoid } from "nanoid";
import Url from "../module/Url.js";
import dns from 'dns/promises'



const RESERVED = ['api', 'auth', 'url', 'login', 'register', 'logout', 'admin']

const normalizeUrl = (input) => {
    let value = String(input || '').trim()

    // if they have no https then add
    if (!/^https?:\/\//i.test(value)) value = 'https://' + value

    const url = new URL(value)   // showing the error

    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('bad protocol')
    if (!url.hostname.includes('.')) throw new Error('bad host')  // they fond it

    return url.href
}

const createUrl = async (req, res) => {
    try {
        // 1. Body se dono values nikalo (customUrl pehle define hi nahi tha)
        const { longUrl: rawUrl, customUrl } = req.body

        // 2. Format check
        let longUrl
        try {
            longUrl = normalizeUrl(rawUrl)
        } catch {
            return res.status(400).json({ error: 'Use correct url like as: https://example.com' })
        }

        // checck domain exisst oor not
        try {
            await dns.lookup(new URL(longUrl).hostname)
        } catch {
            return res.status(400).json({ error: 'This website do not exist' })
        }

        // 4. Custom alias check
        const alias = String(customUrl || '').trim()

        if (alias && !/^[a-zA-Z0-9_-]{3,30}$/.test(alias)) {
            return res.status(400).json({
                error: 'Custom name 3 se 30 characters ka ho, sirf letters, numbers, - aur _ allowed hain'
            })
        }
        if (RESERVED.includes(alias.toLowerCase())) {
            return res.status(400).json({ error: 'Ye could not use this custom name try another' })
        }

        const shortcode = alias || nanoid(6)

        if (alias && (await Url.exists({ shortcode }))) {
            return res.status(409).json({ error: 'Ye custom shortcode already used hai' })
        }

        // 5. Save (guest ho to user null)
        const result = await Url.create({
            longUrl,
            shortcode,
            user: req.user?.id || null,
        })

        return res.json({
            shortUrl: `${process.env.BASE_URL}/url/${shortcode}`,
            _id: result._id,
            longUrl: result.longUrl,
            shortcode: result.shortcode,
        })
    } catch (err) {
        // Do log ek saath same shortcode banayein to unique index yahan pakad lega
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Ye shortcode pehle se use ho chuka hai' })
        }
        console.log(err)
        return res.status(500).json({ error: 'Server error' })
    }
}




const fetchUrl = async (req, res) => {

    const shortcode = req.params.shortcode;

    const url = await Url.findOne({ shortcode });

    if (!url) {
        return res.status(404).json({ error: "Url not found" })
    }


    res.redirect(302, url.longUrl);

}


// for login user histroy
const getAllUrl = async (req, res) => {

    const { id } = req.user

    const urls = await Url.find({ user: id }).sort({ createdAt: -1 }).limit(50); // naye pehle

    res.json(urls.map(u => ({
        id: u._id,
        longUrl: u.longUrl,
        shortUrl: `${process.env.BASE_URL}/url/${u.shortcode}`,
        createdAt: u.createdAt,
    })));
}


export { createUrl, fetchUrl, getAllUrl }