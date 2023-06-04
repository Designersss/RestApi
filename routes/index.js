const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const servicesRouter = require('./servicesRouter')
const trackRouter = require('./trackRouter')
const albumRouter = require('./albumRouter')


router.use('/user', userRouter)
router.use('/services', servicesRouter)
router.use('/track', trackRouter)
router.use('/albom', albumRouter)

module.exports = router