const express = require('express')

const Artist = require('../models/artist.js')

const appRouter = express.Router()

appRouter.get('/', ( req , res ) => {
    Post.find({}, ( err, artist ) => {

        res.render('index', { artist: artist })

    })

})

module.exports = appRouter
