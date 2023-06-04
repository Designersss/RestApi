const Router = require('express')
const router = new Router()
const trackController = require('../controllers/trackController')


router.post('/', trackController.create)
router.get('/', trackController.getAll)
router.get('/prod/:artistId', trackController.getAllUser)
router.get('/:id', trackController.getOne)
router.get('/genre/:genre', trackController.getGenres)
router.get('/deleted/:id', trackController.deletedTrack)

module.exports = router