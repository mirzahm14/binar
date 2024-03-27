const prisma = require("../config/prisma.js");

const createUser = async (req, res) => {
  try {
    const { name, email, password, identity_type, identity_number,address } = req.body;

    if (!name || !email || !password || !identity_type || !identity_number || !address) {
      res.status(404).json({message: "All fields are required"})
      return
    }

    const users = await prisma.users.findMany()
    const isEmailExist = users.filter(user => user.email === email)
    if(isEmailExist.length > 0) {
      res.status(400).json({message: "Email already exist"})
      return
    }

    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });

    if(user.length === 0) {
      res.status(400).json({message: "User failed to created"})
      return
    }

    await prisma.profiles.create({
        data: {
            identity_type: identity_type.toLowerCase(),
            identity_number: identity_number,
            address: address,
            user_id: user.id
        }
    })

    res.status(201).json({message: "Success", data: user});
  } catch (error) {
    res.status(500).json({message: "Internal server error", data: error.message});
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select:{
        id: true,
        name: true
      }
    });
    if(users.length === 0){
      res.status(404).json({message: "Not found"})
      return;
    }

    res.status(200).json({message: "Success", data: users});
  } catch (error) {
    res.status(500).json({message: "Internal server error", data: error.message});
  }
};

const getUserById = async (req,res) => {
    try {
        const user = await prisma.users.findUnique({
          where:{
            id: Number(req.params.id)
          }
        })

        if(!user){
          res.status(404).json({message: "Not found"})
          return
        }

        const profile = await prisma.profiles.findUnique({
          where:{
            user_id: user.id
          },
          select:{
            identity_type: true,
            identity_number: true,
            address: true
          }
        })

        const result = {...user, profile}

        res.status(200).json({message: "Success", data: result});
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message});
    }
}

module.exports = { createUser, getAllUsers, getUserById };
