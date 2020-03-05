import React from 'react'
import {Button, Header, Form, Divider} from 'semantic-ui-react'

class Purchase extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="purchase-container">
        <h2>Current Ammount: 5000$</h2>
        <input placeholder="Purchase a Stock" />
        <input placeholder="amount" />
        <Button color="green">Purchase</Button>
      </div>
    )
  }
}

export default Purchase
