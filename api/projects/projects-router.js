// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const Project = require('./projects-model')

router.get('/', (req, res) => {
    Project.get()
        .then(proj => {
            res.status(200).json(proj)
        })
        .catch(err => {
            res.status(500).json({
                message:"The project information could not be retrieved",
                err:err.message,
                stack: err.stack
            })
        })
})

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message:'The project does not exist'
            })
        }else{
            res.json(project)
        }
    }catch (err) {
        res.status(500).json({
            message:"The project information could not be retrieved",
            err:err.message,
            stack: err.stack
        })
    }
})

router.post('/', (req, res) => {
    Project.insert(req.body)
      .then(project => {
        res.status(201).json(project)
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({
          message: 'Error adding the project',
        })
      })
  })

router.put('/:id', (req, res) => {
    const changes = req.body
    Project.update(req.params.id, changes)
      .then(project => {
        if (project) {
          res.status(400).json(project)
        } else {
          res.status(404).json({ message: 'The project could not be found' })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({
          message: 'Error updating the project',
        })
      })
  })

router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.remove(req.params.id)
        if (!project) {
            res.status(404).json({
                message: 'The project with the specified ID does not exist',
            })
        } else {
            await Project.remove(req.params.id)
            res.json(project)
            
        }
    } catch (err) {
        res.status(500).json({
            message:'The project could not be removed',
            err: err.message,
            stack: err.stack
        })
    }
})

router.get('/:id/actions', async (req, res) => {
    try {
        const project = await Project.getProjectActions(req.params.id)
        if(!project) {
            res.status(404).json({
                message:'The project does not exist'
            })
        }else{
            res.json(project)
        }
    }catch (err) {
        res.status(500).json({
            message:"The project information could not be retrieved",
            err:err.message,
            stack: err.stack
        })
    }
})


module.exports = router