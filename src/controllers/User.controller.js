const User = require('../models/User.model')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.json({
                message: "User already exists"
            })
        }
        const user = new User(req.body)
        user.hashPassword(password)
        await user.save()
        return res.json({
            message: 'User was created successfully',
            detail: user.onSignUpGenerateJWT()
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.json({
                message: "user not found"
            })
        }
        const isCorrectPassword = bcrypt.compareSync(password, userFound.password)
        if (!isCorrectPassword) {
            return res.json({
                message: 'wrong password'
            })
        }
            return res.json({
                message: 'OK',
                detail: { user: userFound, token: userFound.generateJWT() }

            })

    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const resp = await User.find()
        return res.json({
            message: 'Users',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const newData = req.body
        const resp = await User.findByIdAndUpdate(
            newData._id,
            { $set: newData },
            { new: true }
        )
        return res.json({
            message: "User was updated successfully",
            detail: resp
        })

    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const resp = await User.findByIdAndDelete(req.body._id)

        return res.json({
            message: "User was deleted successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

module.exports = {
    signUp,
    logIn,
    getUsers,
    updateUser,
    deleteUser
}