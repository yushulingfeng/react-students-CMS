import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Link, Route,Switch } from "react-router-dom";

import Complaint from './Complaint/Complaint.jsx'
import Problem from './Problem/Problem.jsx'
import Itemupload from './Itemupload/Itemupload.jsx'
import VIP from './VIP/VIP.jsx'
import Weekly from './Weekly/Weekly.jsx'
import Discipline from './Discipline/Discipline.jsx'
import Leave from './Leave/Leave.jsx'
import Welcome from './Welcome/Welcome.jsx'

import state from '../../state/state'

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Home extends Component {
  state = {
    nav: state.nav
  }


  render() {
    return (
      <Layout>
        <Layout>
          <Router>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu 
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >

                {this.state.nav.map((item) => {
                  return (<SubMenu
                    key={item.key}
                    title={<span><Icon type={item.iconType} />{item.title}</span>}
                  >
                    {item.options.map((item) => {
                      return (
                        <Menu.Item key={item.key}>
                          <Link to={item.url}>{item.title}</Link>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>)
                })}

              </Menu>
            </Sider>
            <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/home" exact component={Welcome} />
            <Route path="/home/complaint" component={Complaint} />
            <Route path="/home/problem" component={Problem} />
            <Route path="/home/itemupload" component={Itemupload} />
            <Route path="/home/vip" component={VIP} />
            <Route path="/home/weekly" component={Weekly} />
            <Route path="/home/discipline" component={Discipline} />
            <Route path="/home/leave" component={Leave} />
            </Switch>
          </Router>
        </Layout>
      </Layout>
    )
  }
}

