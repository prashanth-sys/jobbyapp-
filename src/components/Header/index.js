import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="BgForHeader">
      <ul>
        <li className="liWebSiteLogo">
          <img
            className="webSiteLogo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </ul>
      <ul className="HomeAndJobs">
        <Link to="/" className="link">
          <li className="HomeAndJobsStyle">Home</li>
        </Link>

        <Link to="jobs" className="link">
          <li className="HomeAndJobsStyle">Jobs</li>
        </Link>
      </ul>
      <div>
        <button className="LogoutButton" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
