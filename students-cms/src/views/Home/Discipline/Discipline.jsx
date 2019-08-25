import React, { Component } from 'react';
import { Layout, Breadcrumb,Divider,Table } from 'antd';
// import axios from 'axios';
import Cookie from 'js-cookie';

const { Content } = Layout;

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 150,
  },
  {
    title: '扣分(分数)',
    dataIndex: 'deduction',
    width:150
  },{
    title: '剩余分数',
    dataIndex: 'surplus',
    width:150
  },{
    title: '理由',
    dataIndex: 'reason',
    width:200
  },{
    title: '操作人',
    dataIndex: 'admin',
    width:150
  },{
    title: '操作时间',
    dataIndex: 'time',
    width:200
  }
];
const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    key:i,
    name: ``,
    type: '',
    deduction:'',
    surplus:'',
    reason:'',
    admin:'',
    time:'刚刚'
  });
}

export default class Discipline extends Component {
  state={
    username: Cookie.get('username'),
    // data:[]
  }

  // componentDidMount() {
  //   this.getData();
  // }

  // async getData() {
  //   await axios.post('http://localhost:3000/getdata/getdata',{
  //     param:'leave',
  //     name:this.state.username
  //   }).then((response) => {
  //     this.setState({data:response.data.data})
  //     this.state.data.forEach((item,index) => {
  //       item.key = index + 1;
  //     });
  //     // console.log(this.state.data)
  //   });
  // }

  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>学员考勤</Breadcrumb.Item>
          <Breadcrumb.Item>学员违纪</Breadcrumb.Item>
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
           <div>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
          </div>
        </Content>
      </Layout>
    )
  }
}