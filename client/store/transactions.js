import axios from 'axios'
import history from '../history'
import {me} from './user'
import {key} from '../../secrets'

function apiCall(symbol) {
  return (
    `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote&token=` +
    key
  )
}

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultTransactions = {
  portfolio: [],
  allTransactions: []
}

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const gotTransactions = trans => ({type: GET_TRANSACTIONS, trans})

/**
 * THUNK CREATORS
 */
export const getPortfolio = () => async dispatch => {
  try {
    const res = await axios.get('/api/transactions')

    //format for portfolio
    let allTransactions = res.data
    let hash = {}
    allTransactions.map(trans => {
      if (!hash[trans.stockSymbol]) {
        hash[trans.stockSymbol] = trans.sharesPurchased
      } else {
        hash[trans.stockSymbol] += trans.sharesPurchased
      }
    })

    let result = []
    let i = 0
    for (let key in hash) {
      let stock = await axios.get(apiCall(key))
      let amount = stock.data.quote.latestPrice * hash[key]
      let change = stock.data.quote.change

      result.push({
        id: `${i++}`,
        stockSymbol: `${key}`,
        shares: `${hash[key]}`,
        amount: amount.toFixed(2),
        change: change
      })
    }
    dispatch(gotPortfolio(result))
  } catch (err) {
    console.error(err)
  }
}

export const buyStock = obj => async dispatch => {
  try {
    await axios.post('/api/transactions', obj)
    dispatch(me())
    dispatch(getPortfolio())
  } catch (err) {
    console.error(err)
  }
}

export const getAllTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/transactions')
    console.log(res.data)
    dispatch(gotTransactions(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    case GET_TRANSACTIONS:
      return {...state, allTransactions: action.trans}
    default:
      return state
  }
}
