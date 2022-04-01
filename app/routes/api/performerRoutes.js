const express = require('express')
const router = express.Router()

const dao = require('../../daos/api/performerDao')

router.get('/', (req, res)=> {
    dao.findAll(res, 'performer')
})

router.get('/sort', (req, res)=> {
    dao.sort(req, res)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, 'performer', req.params.id)
})

router.post('/create', (req, res)=> {
    dao.create(req, res)
})

router.patch('/update', (req, res)=> {
    dao.update(req, res)
})

module.exports = router