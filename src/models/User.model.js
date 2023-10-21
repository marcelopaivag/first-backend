const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    dob: { type: Date },
    email: { type: String },
    phone: { type: Number},
    password: { type: String },
    salt: String
})

userSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex')
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({ userId: this._id  }, secret)
}

userSchema.methods.onSignUpGenerateJWT = function () {
    return {
        userId: this._id,
        token: this.generateJWT()
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User