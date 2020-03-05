const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(transactions)
    } catch (err) {
      next(err)
    }
  }
})

router.post('/', async (req, res, next) => {
  if (req.user) {
    try {
      const transaction = await Transaction.create(req.body)
      res.json(transaction)
    } catch (err) {
      next(err)
    }
  }
})
