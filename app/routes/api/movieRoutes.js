const express = require('express')
const router = express.Router()

const dao = require('../../daos/api/movieDao')

router.get('/', (req, res)=> {
    dao.findAll(res, 'movie')
})

router.get('/:id', (req, res)=> {
    dao.findById(res, 'movie', req.params.id)
})

router.post('/create', (req, res)=> {
    dao.create(req, res)
})

router.patch('/update', (req, res)=> {
    dao.update(req, res)
})

module.exports = router