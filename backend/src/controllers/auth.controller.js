import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../module/user.model.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}




const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Please provide all the fields" })
    }

    const existemail = await User.findOne({ email })
    if (existemail) {
        return res.status(400).json({ error: "User already exists" })
    }

    const hashPassword = bcrypt.hashSync(password, 10)

    const createUser = await User.create({
        username,
        email,
        password: hashPassword
    })

    if (!createUser) {
        return res.status(500).json({ error: "User not created" })
    }

    const token = generateToken(createUser._id)
    res.cookie("token", token);

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: createUser._id,
            username: createUser.username,
            email: createUser.email,
            password: createUser.password,
            token
        }
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please provide all the fields" })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid password" })
    }

    const token = generateToken(user._id)
    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            token
        }
    })
}

const logoutUser = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "User logged out successfully" })
}

const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password")
    res.status(200).json(user)
}

export { createUser, loginUser, logoutUser, getProfile }