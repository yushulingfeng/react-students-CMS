import React, { Component } from 'react';
import HomePage from './components/HomePage.jsx'
import LoginPage from './components/LoginPage.jsx'
import Cookie from 'js-cookie'

function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <HomePage />;
        }
        return <LoginPage />;
      }

export default class App extends Component {
  state={
    bool:false
  }

  componentWillMount() {
    let name = Cookie.get('username')
    if(name){
      this.setState({bool:true})
    }else{
      this.setState({bool:false})
    }
  }

    render() {
        return (
            <Greeting isLoggedIn={this.state.bool} />
        )
    }
}