import React from 'react'
import {Button, Header, Form, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {buyStock} from '../store/transactions'
import {me} from '../store/user'
import {key} from '../../secrets'
import axios from 'axios'

function apiCall(symbol) {
  return (
    `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote&token=` +
    key
  )
}

class Purchase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockSymbol: '',
      sharesPurchased: '',
      stockName: '',
      stockPriceAtPurchase: 0,
      userId: this.props.userId
    }
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  async handleSumbit(event) {
    try {
      let result = await axios.get(apiCall(this.state.stockSymbol))

      this.setState({
        stockName: result.data.quote.companyName,
        stockPriceAtPurchase: result.data.quote.latestPrice
      })

      const total =
        parseInt(this.state.sharesPurchased) * this.state.stockPriceAtPurchase

      if (total > this.props.userBank) {
        this.setState({
          error: 'Not Enough Funds'
        })
      } else if (
        this.state.sharesPurchased <= 0 ||
        this.state.sharesPurchased % 1 ||
        !parseInt(this.state.sharesPurchased)
      ) {
        this.setState({
          error: 'Stock purchases should be greater than zero and whole numbers'
        })
      } else {
        let obj = {
          stockSymbol: this.state.stockSymbol.toUpperCase(),
          sharesPurchased: this.state.sharesPurchased,
          stockName: this.state.stockName,
          userId: this.state.userId,
          amountPaid: total,
          stockPriceAtPurchase: this.state.stockPriceAtPurchase
        }

        this.props.buyStock(obj)

        this.setState({
          stockSymbol: '',
          sharesPurchased: '',
          amountPaid: 0,
          error: ''
        })
      }
    } catch (error) {
      console.log(error)

      this.setState({
        error: 'Ticker not found! Please enter valid Ticker!'
      })
    }
  }

  render() {
    return (
      <div className="purchase-container">
        <h2>Current Amount: ${this.props.userBank.toFixed(2)}</h2>
        <div className="purchase-input">
          <input
            placeholder="Enter a Stock Symbol"
            name="stockSymbol"
            type="text"
            value={this.state.stockSymbol}
            onChange={evt => this.setState({stockSymbol: evt.target.value})}
          />
          <input
            placeholder="Enter Amount"
            name="sharesPurchased"
            type="integer"
            value={this.state.sharesPurchased}
            onChange={evt => this.setState({sharesPurchased: evt.target.value})}
          />
          <Button onClick={this.handleSumbit} color="green">
            Purchase
          </Button>
          {this.state.error ? <Header as="h4">{this.state.error}</Header> : ''}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userBank: state.user.ammount,
    userId: state.user.id
  }
}

const mapDisptach = dispatch => {
  return {
    buyStock: obj => dispatch(buyStock(obj)),
    updateBank: () => dispatch(me())
  }
}

export default connect(mapState, mapDisptach)(Purchase)
