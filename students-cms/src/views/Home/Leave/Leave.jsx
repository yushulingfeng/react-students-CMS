import React, { Component } from 'react';
import { Layout, Breadcrumb, Divider, Input, DatePicker, Button, Table, message, Modal } from 'antd';
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
    title: '请假理由',
    dataIndex: 'reason',
    width: 500,
  },
  {
    title: '班主任审批',
    dataIndex: 'approval1',
    width: 100
  }, {
    title: '讲师审批',
    dataIndex: 'approval2',
    width: 100
  }, {
    title: '请假时间',
    dataIndex: 'leaveTime',
    width: 250
  }, {
    title: '创建时间',
    dataIndex: 'time',
    width: 150
  }
];

export default class Leave extends Component {

  state = {
    username: Cookie.get('username'),
    size: 'large',
    startValue: null,
    endValue: null,
    endOpen: false,
    cont: '',
    data:[]
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  // 监听输入框的内容
  onchange = (event) => {
    this.setState({
      cont: event.target.value
    })
  }
  
  componentDidMount() {
    this.getData();
   
  }

  async getData() {
    await axios.post('http://localhost:3000/getdata/getdata',{
      param:'leave',
      name:this.state.username
    }).then((response) => {
      this.setState({data:response.data.data})
      this.state.data.forEach((item,index) => {
        item.key = index + 1;
      });
      // console.log(this.state.data)
    });
  }

  // 点击提交
  async success() {
    let name = this.state.username;
    let reason = this.state.cont;
    let approval1 = '待审批';
    let approval2 = '待审批';
    let beginTime = moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss');
    let endTime = moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss');
    let leaveTime = beginTime + '~' + endTime;
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log(leaveTime)
    if (leaveTime && reason) {
      await axios.post('http://localhost:3000/leave/leave', {
        name,
        reason,
        approval1,
        approval2,
        leaveTime,
        time
      }).then((response) => {
        // console.log(response)
        Modal.success({
          title: '这是一条正经的提示框！',
          content: '您的请假申请已提交成功！',
        });
        this.setState({
          cont: '',
          startValue: null,
          endValue: null
        });
        this.getData();
      }).catch((error) => {
        Modal.error({
          title: '这是一条正经的提示框！',
          content: '您的提交出错了！',
        });
      });
    } else {
      message.warning('请输入内容！', 1)
    }
  }

  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>学员考勤</Breadcrumb.Item>
          <Breadcrumb.Item>学员请假</Breadcrumb.Item>
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
            <div>
              <span style={{ marginBottom: 88, display: 'inline-block', color: 'red' }}>请假理由：</span>
              <TextArea onChange={this.onchange.bind(this)} value={this.state.cont} style={{ width: 600, marginBottom: 15 }} rows={4} placeholder="请输入请假理由" />
              <div style={{ marginBottom: 70 }}>
                <span style={{ color: 'red' }}>请假时间：</span>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  value={this.state.startValue}
                  placeholder="Start"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                --
                  <DatePicker
                  disabledDate={this.disabledEndDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  value={this.state.endValue}
                  placeholder="End"
                  onChange={this.onEndChange}
                  open={this.state.endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              </div>
              <p style={{ width: 250, display: 'flex', justifyContent: 'space-between', marginBottom: 30, marginLeft: 150 }}>
                <Button onClick={this.success.bind(this)} type="primary" icon="check" size={this.state.size}>
                  申请
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