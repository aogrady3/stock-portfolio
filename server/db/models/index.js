const User = require('./user')
const Transaction = require('./transaction')

/**
 * Define relationships here, and export for use.
 */

//  One to Many relationshipts
Transaction.belongsTo(User)
User.hasMany(Transaction)

module.exports = {
  User,
  Transaction
}
