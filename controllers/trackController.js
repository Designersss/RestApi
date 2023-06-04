const path = require("path");
const {Track} = require("../models/models");
const uuid = require('uuid')
const ApiError = require('../error/ApiError')
class trackController {
    async create(req, res, next) {
        try{
            const {name, artistId, listens, priceMp3, priceWav, priceOut, pricePremium, priceLeasing, genre, BPM} = req.body
            const {img} = req.files
            const {trackMp3} = req.files
            let fileNameOne = uuid.v4() + ".jpg"
            let trackName = uuid.v4() + ".mp3"
            img.mv(path.resolve(__dirname, '..', 'static', fileNameOne))
            trackMp3.mv(path.resolve(__dirname, '..', 'tracksFile', trackName))
            const track = await Track.create({name, artistId, listens, priceMp3, priceWav, priceOut, pricePremium, priceLeasing, genre, BPM,  img: fileNameOne, trackMp3: trackName})
            return res.json(track)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res) {
        const track = await Track.findAll()
        return res.json(track)
    }

    async getAllUser(req, res) {
        const {artistId} = req.params
        const track = await Track.findAll({
            where: {artistId}
        })
        return res.json(track)
    }

    async getOne(req, res) {
        const {id} = req.params
        const track = await Track.findOne(
            {
                where: {id}
            }
        )
        return res.json(track)
    }

    async getGenres(req, res) {
        const {genre} = req.params
        const track = await Track.findAll(
            {
                where: {genre}
            }
        )
        return res.json(track)
    }

    async deletedTrack(req, res) {
        const {id} = req.params
        const track = await Track.destroy(
            {
                where: {id}
            }
        )
        return res.json(track)
    }
}

module.exports = new trackController()