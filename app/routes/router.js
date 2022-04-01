const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default:fetch}) => fetch(...args))
const router = express.Router()
const PORT = process.env.PORT || 3000

router.use(express.static('public'))

// VIEWS - Home
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'Movie Homepage',
        name: 'Movie Homepage'
    })
})

// VIEWS - Movies
router.get('/movie', (req, res)=> {
    const URL = `http://localhost:${PORT}/api/movie`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/movie', {
                title: 'All Movies',
                name: 'All Movies',
                data
            })
        })
})

router.get('/movie/:id', (req, res)=> {
    const id = req.params.id
    const URL = `http://localhost:${PORT}/api/movie/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/movie-single', {
                    title: `${data.title}`,
                    name: `${data.title}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 ERROR',
                    name: '404 ERROR - Page Not Found'
                })
            }
        })
})

// VEIWS - Performers
router.get('/performer', (req, res)=> {
    const URL = `http://localhost:${PORT}/api/performer`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/performer', {
                title: 'All Performers',
                name: 'All Performers',
                data
            })
        })
})

router.get('/perfomer/:id', (req, res)=> {
    const id = req.params.id
    const URL = `http://localhost:${PORT}/api/performer/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/performer-single', {
                    title: `${data.fName} ${data.lName}`,
                    name: `${data.fName} ${data.lName}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 ERROR',
                    name: '404 ERROR - Page Not Found'
                })
            }
        })
})

// VEIWS - Add A Movie
router.get('/add-movie', (req, res)=> {
    res.render('pages/add-movie', {
        title: 'Movie Form',
        name: 'Movie Submission Form'
    })
})

// API
// ALL ROUTES
router.get('/api', (req, res)=> {
    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie`,
        'All Performers': `http://localhost:${PORT}/api/performer`,
        'All Producers': `http://localhost:${PORT}/api/producer`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Genres': `http://localhost:${PORT}/api/genre`
    })
})

router.use('/api/movie', require('./api/movieRoutes'))

router.use('/api/performer', require('./api/performerRoutes'))

router.use('/api/producer', require('./api/producerRoutes'))

router.use('/api/director', require('./api/directorRoutes'))

router.use('/api/genre', require('./api/genreRoutes'))

router.get('*', (req, res)=> {
    if(req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 ERROR',
            name: '404 ERROR - Page Not Found'
        })
    }
})

module.exports = router