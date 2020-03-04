import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {Button, Header, Form, Container, Divider} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="center">
      <Form onSubmit={handleSubmit} name={name}>
        <Header as="h1" textAlign="center">
          Please {displayName}
        </Header>
        <div>
          <Form.Field label="Email" />
          <input name="email" type="text" />
        </div>
        <div>
          <Form.Field label="Password" />
          <input name="password" type="password" />
        </div>
        <div style={{textAlign: 'center', marginTop: '10px'}}>
          <Button color="green" type="submit">
            {displayName}
          </Button>
        </div>
        <Divider />
        {name === 'login' ? (
          <div style={{justifyContent: 'center', textAlign: 'center'}}>
            <Header as="h3">
              Don't Have an Account? Click Below to Sign Up!
            </Header>
            <Link to="/signup">
              <Button color="blue">Sign Up</Button>
            </Link>
          </div>
        ) : (
          <div style={{justifyContent: 'center', textAlign: 'center'}}>
            <Header as="h3">
              Already Have an Account? Click to Log Back In!
            </Header>
            <Link to="/login">
              <Button color="blue">Login</Button>
            </Link>
          </div>
        )}
        {error &&
          error.response && <Header as="h3"> {error.response.data} </Header>}
      </Form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
