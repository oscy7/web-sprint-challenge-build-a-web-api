// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Acts = require('./actions-model')

router.get('/', (req, res) => {
    Acts.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({
                message:"The action information could not be retrieved",
                err:err.message,
                stack: err.stack
            })
        })
})

router.get('/:id', async (req, res) => {
    try {
        const action = await Acts.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message:'The action does not exist'
            })
        }else{
            res.json(action)
        }
    }catch (err) {
        res.status(500).json({
            message:"The action information could not be retrieved",
            err:err.message,
            stack: err.stack
        })
    }
})

router.post('/', (req, res) => {
    Acts.insert(req.body)
      .then(actions => {
        res.status(201).json(actions)
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({
          message: 'Error adding the action',
        })
      })
  })

router.put('/:id', (req, res) => {
    const changes = req.body
    Acts.update(req.params.id, changes)
      .then(actions => {
        if (actions) {
          res.status(400).json(actions)
        } else {
          res.status(404).json({ message: 'The actions could not be found' })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({
          message: 'Error updating the action',
        })
      })
  })

module.exports = router