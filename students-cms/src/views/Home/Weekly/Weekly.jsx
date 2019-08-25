import React, { Component } from 'react';
import { Layout, Breadcrumb, Divider, Input, Button,Table, message, Modal } from 'antd';
import Cookie from 'js-cookie';
import axios from 'axios';
import moment from 'moment';

const { Content } = Layout;
const { TextArea } = Input;

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '周报标题',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '周报内容',
    dataIndex: 'content',
    width:500
  },{
    title: '周报状态',
    dataIndex: 'state',
    width:100
  },{
    title: '创建时间',
    dataIndex: 'time',
    width:100
  }
];

export default class Weekly extends Component {
  state = {
    username: Cookie.get('username'),
    size: 'large',
    tit:'',
    cont: '',
    data:[]
  }

  componentDidMount() {
    this.getData();
   
  }

  async getData() {
    await axios.post('http://localhost:3000/getdata/getdata',{
      param:'weekly',
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
      cont: event.target.value
    })
  }

  setTitle = (event) => {
    this.setState({
      tit: event.target.value
    })
  }

  async success() {
    let name = this.state.username;
    let title = this.state.tit;
    let content = this.state.cont;
    let state = '未读';
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    if (title && content) {
      await axios.post('http://localhost:3000/weekly/weekly', {
        name,
        title,
        content,
        state,
        time
      }).then((response) => {
        // console.log(response)
        Modal.success({
          title: '这是一条正经的提示框！',
          content: '您的周报已提交成功！',
        });
        this.setState({
          cont: '',
          tit:''
        });
        this.getData();
      }).catch((error) => {
        Modal.error({
          title: '这是一条正经的提示框！',
          content: '您的提交出错了！',
        });
      });
      this.setState({ value: '' })
    } else {
      message.warning('请输入完整的标题和内容！', 1)
    }
  }


  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>学员后台</Breadcrumb.Item>
          <Breadcrumb.Item>学员周报</Breadcrumb.Item>
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
            <div style={{ color: 'red' }}>周报标题：<Input onChange={this.setTitle.bind(this)} value={this.state.tit} style={{ width: 150, marginBottom: 20 }} placeholder="请填写周报标题" /></div>
            <div><span style={{ marginBottom: 150, display: 'inline-block', color: 'red' }}>周报内容：</span>
            <TextArea onChange={this.onchange.bind(this)} value={this.state.cont} style={{ width: 400, marginBottom: 60 }} rows={4} placeholder="请输入周报理由" />
              <p style={{ width: 250, display: 'flex', justifyContent: 'space-between', marginBottom: 30, marginLeft: 150 }}>
                <Button onClick={this.success.bind(this)} type="primary" icon="check" size={this.state.size}>
                  添加
                </Button>
                <Button icon="arrow-left" size={this.state.size}>
                  返回
                </Button>
              </p>
            </div>
          </div>
          <div>
          <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
          </div>
        </Content>
      </Layout>
    )
  }
}