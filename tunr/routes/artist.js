const express = require('express')

const Artist = require('../models/artist.js')

const artistRouter = express.Router()

artistRouter.get('/new', ( req, res ) => {
    // new view
    // render template for creating a new artist
    res.render('artist/new')

}).post('/new', ( req, res ) => {
    // create a new article in the DB
    // render show view for new artist

    const newArtist = new Artist({
        name: req.body.name,
        genre: req.body.genre,
        hit: req.body.hit,
        band: req.body.band,
        imageUrl: req.body.imageUrl
    })

    newArtist.save()

    res.redirect('/')

})

artistRouter.get('/:id', ( req, res ) => {

    Artist.findById( req.params.id, ( err, artist ) => {

        res.render( 'artist/show', { artist: artist } )

    })

}).post('/:id', ( req, res ) => {

    Artist.findById( req.params.id, ( err, artist ) => {

        artist.comments.push( req.body )
        artist.save()

        res.render( 'artist/show', { artist: artist } )

    })

})


module.exports = artistRouter
