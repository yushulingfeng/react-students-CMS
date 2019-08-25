import React, { Component } from 'react';
import { Layout, Breadcrumb, Input, Button, Table, Divider, message, Modal } from 'antd';
import Cookie from 'js-cookie';
import axios from 'axios';
import moment from 'moment';

const { Content } = Layout;
const { TextArea } = Input;

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '问题理由',
    dataIndex: 'reason',
    width: 500,
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    width: 180
  }, {
    title: '回复',
    dataIndex: 'answer',
    width: 300
  }
];

export default class Problem extends Component {
  state = {
    username: Cookie.get('username'),
    size: 'large',
    content: '',
    data:[]
  }

  componentDidMount() {
    this.getData();
   
  }

  async getData() {
    await axios.post('http://localhost:3000/getdata/getdata',{
      param:'problem',
      name:this.state.username
    }).then((response) => {
      this.setState({data:response.data.data})
      this.state.data.forEach((item,index) => {
        item.key = index + 1;
      });
      // console.log(this.state.data)
    });
  }
  

  onchange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  async success() {
    let name = this.state.username;
    let reason = this.state.content;
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    let answer = '待回复'
    if (name && reason) {
      await axios.post('http://localhost:3000/problem/problem', {
        name,
        reason,
        time,
        answer
      }).then((response) => {
        // console.log(response)
        Modal.success({
          title: '这是一条提示框！',
          content: '您的技术问题已提交成功！',
        });
        this.setState({
          content: ''
        });
        this.getData();
      }).catch((error) => {
        Modal.error({
          title: '这是一条提示框！',
          content: '您的问题提交出错了！',
        });
      });
      this.setState({ value: '' })
    } else {
      message.warning('内容为空！', 1)
    }
  }

  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>学员后台</Breadcrumb.Item>
          <Breadcrumb.Item>技术问题</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 780,
          }}
        >
          <Divider />
          <div style={{ paddingTop: 20, paddingLeft: 200, border: '1px solid #ccc', marginBottom: 15 }}>
            <div style={{ color: 'red' }}>学员姓名：<Input style={{ width: 150, marginBottom: 20 }} defaultValue={this.state.username} /></div>
            <div><span style={{ marginBottom: 150, display: 'inline-block', color: 'red' }}>问题内容：</span>
              <TextArea style={{ width: 500, marginBottom: 60 }} onChange={this.onchange.bind(this)} value={this.state.content} rows={5} placeholder="请输入技术内容" />
              <p style={{ width: 250, display: 'flex', justifyContent: 'space-between', marginBottom: 30, marginLeft: 180 }}>
                <Button type="primary" onClick={this.success.bind(this)} icon="check" size={this.state.size}>
                  提问
                </Button>
                <Button icon="arrow-left" size={this.state.size}>
                  返回
                </Button>
              </p>
            </div>
          </div>
          <div>
            <Table rowKey="key" columns={columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
          </div>
        </Content>
      </Layout>
    )
  }
}