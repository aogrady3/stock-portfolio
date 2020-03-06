import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Header} from 'semantic-ui-react'
import Purchase from './Purchase'
import {getPortfolio} from '../store/transactions'

/**
 * COMPONENT
 */

class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getPortfolio()
  }

  render() {
    const portfolio = this.props.portfolio
    return (
      <div className="home-container">
        <div className="column1">
          {!portfolio.length ? <Header>There's nothing here...</Header> : ''}
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
