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

module.exports = router