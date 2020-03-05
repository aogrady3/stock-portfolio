import React from 'react'
import {Button, Header, Form, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {buyStock} from '../store/transactions'

class Purchase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockSymbol: '',
      sharesPurchased: 0,
      stockName: 'Apple',
      amountPaid: 0,
      userId: this.props.userId
    }
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleSumbit(event) {
    event.preventDefault()
    this.setState({
      amountPaid: this.state.sharesPurchased * 100
    })

    if (this.state.amountPaid < this.props.userBank) {
      this.setState({
        error: 'Not Enough Funds'
      })
    } else if (
      this.state.sharesPurchased <= 0 ||
      this.state.sharesPurchased % 1
    ) {
      this.setState({
        error: 'Stock purchases should be greater than zero and whole numbers'
      })
    } else {
      this.props.buyStock(this.state)
      this.setState({
        stockSymbol: '',
        sharesPurchased: 0,
        error: ''
      })
    }
  }

  render() {
    return (
      <div className="purchase-container">
        <h2>Current Ammount: ${this.props.userBank}</h2>
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
    buyStock: obj => dispatch(buyStock(obj))
  }
}

export default connect(mapState, mapDisptach)(Purchase)
