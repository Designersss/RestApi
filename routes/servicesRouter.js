const Router = require('express')
const router = new Router()
const servicesController = require('../controllers/servicesController')

router.post('/', servicesController.create)
router.get('/', servicesController.getAll)
router.get('/:artistId', servicesController.getOne)
router.get('/deleted/:id', servicesController.deletedServices)

module.exports = router