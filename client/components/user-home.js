import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Divider, Grid, Image, Segment} from 'semantic-ui-react'
import Purchase from './Purchase'
import {getPortfolio} from '../store/transactions'

/**
 * COMPONENT
 */

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio1: [
        {id: 1, stockSymbol: 'APL', shares: 21, amount: '$4000.00'},
        {id: 2, stockSymbol: 'NTFL', shares: 19, amount: '$4000.00'},
        {id: 3, stockSymbol: 'GHI', shares: 16, amount: '$4000.00'},
        {id: 4, stockSymbol: 'THY', shares: 25, amount: '$4000.00'},
        {id: 5, stockSymbol: 'APL', shares: 21, amount: '$4000.00'}
      ]
    }
    this.renderTableData = this.renderTableData.bind(this)
  }
  componentDidMount() {
    this.props.getPortfolio()
  }

  render() {
    const portfolio = this.props.portfolio
    return (
      <div className="home-container">
        <div className="column1">
          {portfolio.map(stock => {
            const {id, stockSymbol, shares, amount} = stock //destructuring
            return (
              <React.Fragment key={id}>
                <div className="single-stock">
                  <div>
                    {stockSymbol} - {shares} shares
                  </div>
                  <div>{amount}</div>
                </div>
                <hr />
              </React.Fragment>
            )
          })}
        </div>
        <div className="vl" />
        <div className="column2">
          <Purchase />
        </div>
      </div>
    )
  }

  renderTableData() {
    return this.state.portfolio.map(stock => {
      const {id, stockSymbol, shares, amount} = stock //destructuring
      return (
        <tr key={id}>
          <td>
            {stockSymbol} - {shares} shares
          </td>
          <td>{amount}</td>
        </tr>
      )
    })
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // email: state.user.email,
    isLoggedIn: !!state.user.id,
    portfolio: state.transactions.portfolio
  }
}

const mapDispatch = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio())
  }
}

export default connect(mapState, mapDispatch)(UserHome)
