const {Services, Track} = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class servicesController {
    async create(req, res) {
        const {name, price, artistId} = req.body
        const {img} = req.files
        let fileNameOne = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'staticServices', fileNameOne))
        const services = await Services.create({name, price, img: fileNameOne, artistId})
        return res.json(services)
    }
    async getAll(req, res) {
        const services = await Services.findAll()
        return res.json(services)
    }
    async getOne(req, res) {
        const {artistId} = req.params
        const services = await Services.findAll({
            where: {artistId}
        })
        return res.json(services)
    }

    async deletedServices(req, res) {
        const {id} = req.params
        const services = await Services.destroy(
            {
                where: {id}
            }
        )
        return res.json(services)
    }
}

module.exports = new servicesController()