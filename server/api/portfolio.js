const router = require('express').Router()
const {Portfolio} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user) {
    try {
      const portfolio = await Portfolio.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(portfolio)
    } catch (err) {
      next(err)
    }
  }
})
