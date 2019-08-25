import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import Cookie from 'js-cookie'

import Home from '../views/Home/Home.jsx'
import Mine from '../views/Mine/Mine.jsx'
import Setting from '../views/Setting/Setting.jsx'

import state from '../state/state'
const { Header } = Layout;
export default class HomePage extends Component {
    state = {
        menus: state.menus,
        display:false,
        bool:true,
        username:'admin'
    }

    loginOutBox() {
        this.setState({display:!this.state.display})
    }

    loginOut() {
        Cookie.remove('username');
        window.location.reload();
    }

    mouseover() {
        this.setState({bool:false})
    }

    mouseout() {
        this.setState({bool:true})
    }

    componentDidMount() {
        let name = Cookie.get('username');
        this.setState({username:name});
    }

    render() {
        return (
            <Layout>
                <Router>
                    <Header className="header" style={{ display: 'flex', justifyContent: 'space-between' ,paddingLeft:0}}>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['0']}
                            style={{ lineHeight: '64px' }}
                        >
                            {
                                this.state.menus.map((item, index) => {
                                    return (<Menu.Item key={index}>
                                        <Link to={item.url}>
                                            {item.name}
                                        </Link>
                                    </Menu.Item>)
                                })
                            }
                        </Menu>
                        <div style={{ textAlign: 'right', color: '#fff', fontSize: 13, flex: 9, cursor: 'pointer', position: 'relative' }} onClick={this.loginOutBox.bind(this)}>
                            <span>{this.state.username}</span>
                            <Icon type="caret-down" />

                            <p onClick={this.loginOut.bind(this)} onMouseOver={this.mouseover.bind(this)} onMouseOut={this.mouseout.bind(this)} style={{ width: 180, textAlign: 'left', position: 'absolute', right: -50, top: 62, background:this.state.bool?'#fff': '#ccc', paddingLeft: 30,zIndex:9, border: '1px solid #ccc', fontSize: 16,display:this.state.display?'':'none',userSelect:'none', }}>
                                <Icon style={{ color: '#333', marginRight: 10, fontWeight: 700 }} type="poweroff" />
                                <span style={{ color: '#333' }}>退出</span>
                            </p>

                        </div>
                    </Header>
                    <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/mine" component={Mine}></Route>
                    <Route path="/setting" component={Setting}></Route>
                    </Switch>
                </Router>
            </Layout>
        )
    }
}