import React, { Component } from 'react';
import { Layout, Breadcrumb, Divider, Input, Button,Modal,message } from 'antd';
import Cookie from 'js-cookie';
import axios from 'axios';

const { Content } = Layout;
const { TextArea } = Input;
const { confirm } = Modal;

export default class VIP extends Component {
  state = {
    username: Cookie.get('username'),
    size: 'large',
    value:''
  }

  componentDidMount() {}

  content = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  showConfirm() {
    let username = this.state.username;
    let reason = this.state.value;
    if(username && reason) {
      confirm({
        title: '申请VIP',
        content: '您确定需要申请VIP服务吗？',
        async onOk() {
          await axios.post('http://localhost:3000/vip/vip',{
            username,
            reason
          }).then((response)=>{
            message.success('申请成功，请等待回复！', 1)
          }).catch((error)=>{
            message.error('申请出错，请重新尝试！', 1)
          })
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => {});
        },
        onCancel() {},
      });
    }else {
      message.warning('内容为空！', 1)
    }
    
    this.setState({value:''})
  }

  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>学员后台</Breadcrumb.Item>
          <Breadcrumb.Item>VIP</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 780,
          }}
        >
          <div>
            <h3 style={{ fontWeight: 700, color: 'red', textAlign: "center", fontSize: 15 }}>您还不是VIP学员，填写下面表单可以申请VIP学员！</h3>
            <Divider />
            <div style={{ paddingTop: 20, paddingLeft: 200, border: '1px solid #ccc', marginBottom: 15 }}>
              <div style={{ color: 'red' }}>学员姓名：<Input style={{ width: 150, marginBottom: 20 }} defaultValue={this.state.username} /></div>
              <div>
                <span style={{ marginBottom: 150, display: 'inline-block', color: 'red' }}>申请理由：</span>
                <TextArea style={{ width: 500, marginBottom: 60 }} onChange={this.content.bind(this)} value={this.state.value} rows={5} placeholder="请输入申请理由" />
                <p style={{ width: 250, display: 'flex', justifyContent: 'space-between', marginBottom: 30, marginLeft: 150 }}>
                  <Button onClick={this.showConfirm.bind(this)} type="primary" icon="check" size={this.state.size}>
                    申请
                  </Button>
                  <Button icon="arrow-left" size={this.state.size}>
                    返回
                </Button>
                </p>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }
}