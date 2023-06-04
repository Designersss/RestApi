const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models')
const jwt = require('jsonwebtoken')
const uuid = require("uuid");
const path = require("path");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, description, socialVk, socialTel, name} = req.body
        const {img} = req.files
        let fileNameOne = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'staticUsers', fileNameOne))
        if (!email || !password) {
            return next(ApiError.badRequest('Неккоректные данные'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким Email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, img: fileNameOne, description, socialVk, socialTel, name})
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }
d
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name)
        return res.json({token})
    }

    async getAll(req, res, next) {
        const users = await User.findAll()
        return res.json(users)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const users = await User.findOne({
            where: {id}
        })
        return res.json(users)
    }

}

module.exports = new UserController()