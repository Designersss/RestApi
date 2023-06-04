const sequelize = require('../db')
const {DataTypes, Sequelize} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    socialVk: {type: DataTypes.STRING},
    socialTelegram: {type: DataTypes.STRING},
    socialYoutube: {type: DataTypes.STRING},
    socialTwitch: {type: DataTypes.STRING},
})

const Track = sequelize.define('track', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    artistId: {type: DataTypes.INTEGER},
    listens: {type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING, allowNull: false},
    priceMp3: {type: DataTypes.INTEGER},
    priceWav: {type: DataTypes.INTEGER},
    priceOut: {type: DataTypes.INTEGER},
    pricePremium: {type: DataTypes.INTEGER},
    priceLeasing: {type: DataTypes.INTEGER},
    genre: {type: DataTypes.STRING},
    BPM: {type: DataTypes.INTEGER},
    trackMp3: {type: DataTypes.STRING},
})

const Album = sequelize.define('album', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    artistId: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    track: {type: DataTypes.STRING},
})

const Services = sequelize.define('services', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    artistId: {type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER}
})

User.hasMany(Track)
Track.belongsTo(User)

User.hasMany(Services)
Services.belongsTo(User)

User.hasMany(Album)
Album.belongsTo(User)

Album.hasMany(Track)
Track.belongsTo(Album)

module.exports = {
    User,
    Track,
    Album,
    Services,
}