const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isExist = await prisma.users.findUnique({ where: { email } });
    if (isExist) {
      return res.status(401).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    });

    if (!user) {
      return res.status(402).json({ message: "User failed to created" });
    }

    return res.status(201).json({ message: "Success", data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", data: err.message });
  }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await prisma.users.findUnique({ where: { email } })

        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        return res.status(200).json({message: "Success", data: {...user, token}})
    } catch (err) {
        next(err)
    }
}

const authenticate = async (req, res) => {
    res.status(200).json({message: "Success", data: req.user})
}

module.exports = { register, login, authenticate };
