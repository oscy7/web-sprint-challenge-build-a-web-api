// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
      const action = await Actions.get(req.params.id)
      if(!action){
        res.status(404).json({
          message: 'Did not Find anything!'
        })
      }else {
        req.action = action
        next()
      }
    }catch (err){
      res.status(400).json({
        message: 'Missing Requirements!'
      })
    }
  }

  module.exports = {
    validateActionId
}

