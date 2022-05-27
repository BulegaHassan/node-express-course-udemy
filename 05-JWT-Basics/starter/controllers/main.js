
const customAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')



const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new customAPIError('Please provide email and password', 400)
    }
    // just for demo, normally provided by the DB
    const id = new Date().getDate()
    // try to keep the payload small, better experience for user
    const token = jwt.sign({id,username}, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    //    console.log(req.headers);
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token Provided', 401)
    }

    const token = authHeader.split(' ')[1]
    // console.log(token);
    // verify token from frontend
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
         // console.log(decoded);
         const randomNumber = Math.floor(Math.random() * 100)
         res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: `Here is your authorized data, your random number is ${randomNumber}` })
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }

}

module.exports = {
    login,
    dashboard
}