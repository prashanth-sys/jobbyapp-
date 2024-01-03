import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 31})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  SubmitDetailsOfUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  UserName = event => {
    this.setState({username: event.target.value})
  }

  Password = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    console.log(username)
    console.log(password)
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bgLogin">
        <div className="flexingLogin">
          <div className="CenterLogo">
            <div className="LogoOfWebSiteLogin">
              <img
                className="webSiteLogoForLoginPage"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </div>
          </div>

          <form onSubmit={this.SubmitDetailsOfUser}>
            <div>
              <label htmlFor="UserName" className="label">
                USERNAME
              </label>
              <br />
              <input
                className="Input"
                id="UserName"
                type="text"
                placeholder="Username"
                onChange={this.UserName}
                value={username}
              />
            </div>

            <br />

            <div>
              <label htmlFor="PassWord" className="label">
                PASSWORD
              </label>
              <br />
              <input
                className="Input"
                type="password"
                id="PassWord"
                placeholder="Password"
                onChange={this.Password}
                value={password}
              />
            </div>

            <div>
              <button className="LoginButton" type="submit">
                Login
              </button>
            </div>
            {showSubmitError ? <p className="message">{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
