import axios from 'axios'
import history from '../history'
import {me} from './user'

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = 'GET_PORTFOLIO'

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
      result.push({
        id: `${i++}`,
        stockSymbol: `${key}`,
        shares: `${hash[key]}`,
        amount: 2000
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

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    default:
      return state
  }
}
