const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')




router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)

module.exports = router