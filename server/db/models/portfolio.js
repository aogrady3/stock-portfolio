const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  stockSymbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stockName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalSharesOwned: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  totalAmountOwned: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Portfolio
