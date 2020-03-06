import React from 'react'
import {connect} from 'react-redux'
import {getAllTransactions} from '../store/transactions'
import {Header} from 'semantic-ui-react'

class Transactions extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllTransactions()
  }

  render() {
    const transactions = this.props.transactions
    return (
      <div className="home-container">
        <div className="column3">
          {!transactions.length ? <Header>There's nothing here...</Header> : ''}
          <h1>All Transactions</h1>
          {transactions.map(stock => {
            const {
              id,
              stockSymbol,
              sharesPurchased,
              stockPriceAtPurchase
            } = stock //destructuring
            return (
              <React.Fragment key={id}>
                <div className="single-stock">
                  <div>
                    BUY ({stockSymbol}) @ {sharesPurchased} shares
                  </div>
                  <div>${stockPriceAtPurchase.toFixed(2)}</div>
                </div>
                <hr />
              </React.Fragment>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.transactions.allTransactions
  }
}

const mapDispatch = dispatch => {
  return {
    getAllTransactions: () => dispatch(getAllTransactions())
  }
}

export default connect(mapState, mapDispatch)(Transactions)
