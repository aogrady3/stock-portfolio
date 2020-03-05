const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  stockSymbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stockName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sharesPurchased: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amountPaid: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  stockPriceAtPurchase: {
    type: Sequelize.FLOAT
  }
})

module.exports = Transaction
