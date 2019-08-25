import React, { Component } from 'react';
import { Input, Button, message,Icon } from 'antd';
import Cookie from 'js-cookie';
import axios from 'axios';

export default class LoginPage extends Component {

  state = {
    username: '',
    pwd: '',
    size: 'large',
    bool: true
  }

  username = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  pwd = (event) => {
    this.setState({
      pwd: event.target.value
    })
  }

  async keydown(e) {
    let usernameVal = this.state.username;
    let pwdVal = this.state.pwd;
    if (e.keyCode === 13) {
      if (usernameVal && pwdVal) {
        await axios.post('http://localhost:3000/login/login', {
          username: usernameVal,
          pwd: pwdVal
        }).then((response) => {
          // console.log(response);
          if(response.data.data.length < 0) {
            message.warning('用户名不存在，已经给您注册成功，请重新尝试登录！', 2)
          }else{
            if (pwdVal === response.data.data[0].pwd) {
              message.success('登录成功！', 1, (onClose) => {
                Cookie.set('username', this.state.username, 7);
                window.location.reload();
              });
            } else {
              message.warning('请输入正确的密码尝试重新登录！', 2)
            }
          }
        })
          .catch((error) => {
            // console.log(error);
            message.warning('用户名不存在，已经给您注册成功，请重新尝试登录！', 2)
          });
      } else {
        message.warning('请输入用户名和密码！')
      }
    }
  }

  async loginIn() {
    let usernameVal = this.state.username;
    let pwdVal = this.state.pwd;
    if (usernameVal && pwdVal) {
      await axios.post('http://localhost:3000/login/login', {
        username: usernameVal,
        pwd: pwdVal
      }).then((response) => {
        // console.log(response);
        if(response.data.data.length < 0) {
          message.warning('用户名不存在，已经给您注册成功，请重新尝试登录！', 2)
        }else {
          if (pwdVal === response.data.data[0].pwd) {
            message.success('登录成功！', 1, (onClose) => {
              Cookie.set('username', this.state.username, 7);
              window.location.reload();
            });
          } else {
            message.warning('请输入正确的密码尝试重新登录！', 2)
          }
        }
      })
        .catch((error) => {
          // console.log(error);
          message.warning('登录错误，请重新尝试登录！', 2)
        });
    } else {
      message.warning('请输入用户名和密码！', 2)
    }

  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', background: '#001529', paddingTop: 150 }}>
        <div style={{ width: 500, height: 400, margin: 'auto', background: '#eee', borderRadius: 5, padding: 50, paddingTop: 80 }}>
          <p>
            <span style={{ display: 'inline-block', width: 60, textAlign: 'right' }}>用户名：</span>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.username.bind(this)} style={{ width: 300, marginBottom: 20 }} placeholder="请输入用户名" value={this.state.username} />
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 60, textAlign: 'right' }}>密码：</span>
            <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.pwd.bind(this)} onKeyDown={this.keydown.bind(this)} style={{ border: this.state.bool ? 'none' : '1px solid red', borderRadius: 5, width: 300, marginBottom: 20 }} placeholder="请输入密码" />
          </p>
          <p style={{ paddingLeft: 60 }}>
            <span style={{ display: 'block' }} onClick={this.loginIn.bind(this)}>
              <Button style={{ width: 300 }} type="primary">登录</Button>
            </span>
          </p>
          <p style={{ fontSize: 13, color: 'red', paddingLeft: 90, paddingTop: 10 }}>
            <span>提示：输入用户名密码，自动注册登录</span>
          </p>
        </div>
      </div>
    )
  }
}