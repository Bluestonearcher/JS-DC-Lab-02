const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema({
    name: String,
    genre: String,
    hit: String,
    band: String,
    imageUrl: String
})

const Artist = mongoose.model( 'Artist', artistSchema )

module.exports = Artist


