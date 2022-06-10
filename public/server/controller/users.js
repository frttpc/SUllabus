const User = require('../models/user')
const bcrypt = require("bcryptjs")

const getUsers = async(req, res) => {

    try
    {
        await mongoose.connection.dropDatabase();

        await Content.find({}, (err, users) => {
            return res.status(200).json({
              userList: users
            })
        })

    }
    catch(err)
    {
        return res.send(err)
    }
}


const getUserbyID = async(req, res) => {

    try
    {
        await User.findById({id: req.params.id}, (err, user) => {
            return res.status(200).json({
              singleUser: user
            })
        })

    }
    catch(err)
    {
        return res.status(404).send(err)
    }
}

const getUserbyEmail = async(req, res) => {

    try
    {
        await User.find({email: req.params.email}, (err, user) => {
            return res.status(200).json({
              singleUser: user
            })
        })

    }
    catch(err)
    {
        return res.status(404).send(err)
    }
}

const createUser = async(req, res) => {

    const { id, email, password } = req.body;

    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          id,
          email,
          password: hash,
        })
        .then
        (
            console.log("User created"),
            res.json("success")
            
        )
        .catch((err) => 
        {
            console.log("YEHU:" + err)
            return 
        })
    })

}

const updateUser = async(req, res) => {

    try
    {
        const user = await User.findById(req.params._id)

        const {id, email, password, isAuthenticated} = req.body

        if(id)
        {
            user.id = id
        }
        if(email)
        {
            user.email = email
        }
        if(password)
        {
            user.password = password
        }
        if(isAuthenticated)
        {
            user.isAuthenticated = isAuthenticated
        }

        user.save()
            
        console.log("User updated")

        return 
    }
    catch(err)
    {
        return res.status(404).send("Error" + err)
    }
}

module.exports = { getUsers, getUserbyID, getUserbyEmail, createUser, updateUser}
