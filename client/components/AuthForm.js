import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {
    name,
    displayName,
    handleLoginSubmit,
    handleSignupSubmit,
    error
  } = props

  return (
    <div className="auth-form-container">
      <div
        className={
          props.match.path === '/signup'
            ? 'auth-form-signup'
            : 'auth-form-login'
        }
      >
        <form
          onSubmit={
            props.match.path === '/signup'
              ? handleSignupSubmit
              : handleLoginSubmit
          }
          name={name}
        >
          {props.match.path === '/signup' ? (
            <div>
              <div>
                <label htmlFor="firstName">
                  <small className="email">First Name </small>
                </label>
                <input name="firstName" type="text" />
              </div>
              <div>
                <label htmlFor="lastName">
                  <small className="email">Last Name </small>
                </label>
                <input name="lastName" type="text" />
              </div>
              <div>
                <label htmlFor="address">
                  <small className="email">Address </small>
                </label>
                <input name="address" type="text" />
              </div>
            </div>
          ) : (
            <div />
          )}
          <div>
            <label htmlFor="email">
              <small className="email">Email </small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small className="password">Password </small>
            </label>
            <input name="password" type="password" />
          </div>
          <br />
          <div>
            <button type="submit">{displayName}</button>
          </div>
          <br />
          <div id="sign-up-with-google">
            <a href="/auth/google">{displayName} with Google</a>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
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
    handleLoginSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(formName, email, password))
    },
    handleSignupSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const address = evt.target.address.value
      dispatch(auth(formName, email, password, firstName, lastName, address))
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
  handleSignupSubmit: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
