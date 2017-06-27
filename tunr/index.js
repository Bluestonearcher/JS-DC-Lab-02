//Basic requires and dependencies

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')


//attach and connect database - named tunr, to keep it separate from the others
mongoose.connect('mongodb://bluestonearcher:Ohanzee1!@pokedex-shard-00-00-vak88.mongodb.net:27017,pokedex-shard-00-01-vak88.mongodb.net:27017,pokedex-shard-00-02-vak88.mongodb.net:27017/tunr?ssl=true&replicaSet=pokedex-shard-0&authSource=admin')

//require models
const Artist = require('./models/artist')

// require the routers? - look this up again
const appRoutes = require('./routes/index.js')
const artistRoutes = require('./routes/artist.js')


//create application
const app = express()

//registering and using handlebars template
app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//static files (css)
app.use(express.static('public'))

//set body parser
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended: true}))

//app routes ?
//app.use('/', appRoutes)
//app.use('/posts', postRoutes)



// app.use(function(req,res){
//     res.status(404);
//     res.render('404');
// });


//test to see that this basic level functions
// app.get ('/', (req, res) => {
//     res.send('This is Tunr, the greatest info-about-sound-yet-not-actual-sound app ever.')
// })

//point the basic screen to the index page?
// app.get ('/', (req, res) => {
//     res.send(index)
// })
//
// utilize pokedex data to index all current artists listed
// app.get('/artist/new', (req, res) => {
//     let artist = NewArtist ({
//         name: req.body.name,
//         genre: req.body.genre,
//         hit: req.body.hit,
//         band: req.body.band,
//         imageUrl: req.body.imageUrl
//     })
//     artist.save()
//     res.redirect('/artist')
// })

app.get('/', (req, res ) => {
    res.render('index')
})

app.get('artist/new', ( req, res ) => {
    res.render('artst/new')
})

app.post('/artist/new', ( req, res ) => {
    const artist = new Artist({
        name: req.body.name,
        genre: req.body.genre,
        hit: req.body.hit,
        band: req.body.band,
        imageUrl: req.body.imageUrl
    })

    artist.save()
    res.redirect('/artist')
    })


// app.post('/artist/new', (req, res) => {
//     res.redirect('artist')
//
//     artist.findOne({ '_id': req.params.id}, (err, artist) => {
//         artist.name = req.body.name,
//             artist.genre = req.body.genre,
//             artist.hit = req.body.hit,
//             artist.band = req.body.band,
//             imageUrl = req.body.imageUrl
//
//         artist.save()
//         res.redirect('/artist')
//     })
// })


app.post('/artist/edit/:id', (req, res) => {

    Artist.findOne({ '_id': req.params.id }, (err, artist ) => {
        // res.render('artist/edit', { artist })
            artist.name = req.body.name,
            artist.genre = req.body.genre,
            artist.hit = req.body.hit,
            artist.band = req.body.band,
            imageUrl = req.body.imageUrl

        artist.save()

        res.redirect('/artist')
    })
})


// app.get('/artist/:id', ( req, res ) => {
//
//     Artist.findOne({ '_id:': req.params.id }, (err, artist ) => {
//         res.render('artist/single', { artist: artist })
//     })
// })

app.get('/artist/:id', ( req, res ) => {

    Artist.findOne({ '_id:': req.params.id }, function( err, artist ) {
        res.render('artist/single', { artist })
    })
})

// app.get('/artist', (req, res) => {
//     Artist.find{}, ( err, artist ) => {
//         res.render('artist/index', {artist: artist })
//     }
// })

app.get('/artist', (req, res) => {
    Artist.find({}, function( err, artist ) {
        res.render('artist/index', { artist })
    })
})


app.listen( 3000, () => {
    console.log( 'This is a test of your emergency broadcasting system.')
})