// import React from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import Main from './Main'

// const App = () => (
  // <div>
  //   <Header/>
  //   <Main/>
  //   <Footer/>
  // </div>
// )

// export default App

//https://tylermcginnis.com/react-router-protected-routes-authentication


import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

//import {BrowserRouter as Router} from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

import Home from './Home'
import Sensors from './Sensors'
import Users from './Users'
import Development from './Development'

const fakeAuth = {
  username: '',
  password: '',
  isAuthenticated: false,
  authenticate(cb) {

    var postData = {
      "user": this.username,
      "pass": this.password
    };
    var url = String(window.location.href);
    url = url.replace(/login/g, 'api/login');
    url = url.replace(/3000/g, '5000');
    console.log(url);
    var method = "POST";

    var shouldBeAsync = true;
    var request = new XMLHttpRequest();

    request.onload = function() {
        var status = request.status;
        var data = request.responseText;
        if (status === 200) {
            console.log('success: ' + data);
            fakeAuth.isAuthenticated = true
        } else {
            console.log('error: ' + data);
            this.isAuthenticated = false
        }
    }
    request.open(method, url, shouldBeAsync);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(postData));

    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
    console.log(fakeAuth.username, fakeAuth.password)
  }
  updateUsername = (evt) => {
    fakeAuth.username = evt.target.value
  }
  updatePassword = (evt) => {
    fakeAuth.password = evt.target.value
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      <Redirect to={from} />
    }

    return (
      <div className='login-holder'>
        <div className='center-holder'> 
        <form>   
          <p>Username: </p>
          <input onChange={evt => this.updateUsername(evt)} className='username-input' type='text'></input>
          <p>Password: </p>
          <input onChange={evt => this.updatePassword(evt)} className='password-input' type='password' autoComplete='on'></input>
          <br/>
        </form>
          <button className='login-button' onClick={this.login}>Log in</button>
        </div>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <button className='logout-button' onClick={() => {
        fakeAuth.signout(() => history.push('/login'))
      }}>Sign out</button>
  ) : (
    <p>You are not logged in.</p>
  )
))

export default function AuthExample () {
  return (
    <div>
      <Header/>
      <AuthButton/>
      <Switch>
        <Route path='/login' component={Login}/>
        <PrivateRoute exact path='/' component={Home}/>
        <PrivateRoute path='/sensors' component={Sensors}/>
        <PrivateRoute path='/users' component={Users}/>
        <PrivateRoute path='/dev' component={Development}/>
      </Switch>
      <Footer/>
    </div> 
  )
}