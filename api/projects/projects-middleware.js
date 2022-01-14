// add middlewares here related to projects
const Project = require('./projects-model')


async function validateId(req, res, next) {
    try {
      const proj = await Project.get(req.params.id)
      if(!proj){
        res.status(404).json({
          message: 'Not Found!'
        })
      }else {
        req.proj = proj
        next()
      }
    }catch (err){
      res.status(400).json({
        message: 'Missing requiremnets'
      })
    }
  }

module.exports = {
    validateId
}