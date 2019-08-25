import React, { Component } from 'react';
import { Layout, Breadcrumb,Divider,Button, Input,Modal,message } from 'antd';
import axios from 'axios';
import Cookie from 'js-cookie';

const { TextArea } = Input;
const { Content } = Layout;
const { confirm } = Modal;

export default class Complaint extends Component {
  state = {
    size: 'large',
    value:'',
    username:Cookie.get('username')
  }

  componentDidMount() {}

  content = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  showConfirm() {
    let username = this.state.username;
    let complaint = this.state.value;
    if(username && complaint) {
      confirm({
        title: '你确定要提交投诉吗?',
        content: '提交投诉可能会造成一定的影响，请慎重提交！',
        async onOk() {
          await axios.post('http://localhost:3000/complaint/complaint',{
            username,
            complaint
          }).then((response)=>{
            message.success('投诉成功！', 1)
          }).catch((error)=>{
            message.error('提交出错！', 1)
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
          <Breadcrumb.Item>匿名投诉</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 780
          }}
        >
          <Divider />
          <div style={{paddingTop:10,paddingLeft:200,border:'1px solid #ccc'}}>
          <span style={{ fontSize: '13px', color: 'red',display:'inline-block',marginBottom:180}}>投诉内容：</span>
          <TextArea onChange={this.content.bind(this)} value={this.state.value} style={{width:600}} rows={9} placeholder="本投诉是匿名投诉，不会暴露您的信息" />
          <div>
            <p style={{ padding: 30, width: 300, display: 'flex', justifyContent: 'space-between',marginLeft:180 }}>
              <span style={{display:'inline-block'}}>
              <Button onClick={this.showConfirm.bind(this)} type="primary" icon="check" size={this.state.size}>
                添加
              </Button>
              </span>
              <Button icon="arrow-left" size={this.state.size}>
                返回
            </Button>
            </p>
          </div>
          </div>
        </Content>
      </Layout>
    )
  }
}