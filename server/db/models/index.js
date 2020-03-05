const User = require('./user')
const Transaction = require('./transaction')
const Portfolio = require('./portfolio')

/**
 * Define relationships here, and export for use.
 */

//  One to Many relationshipts
Transaction.belongsTo(User)
User.hasMany(Transaction)

//One to Many relationship
Portfolio.belongsTo(User)
User.hasMany(Portfolio)

module.exports = {
  User,
  Transaction,
  Portfolio
}
