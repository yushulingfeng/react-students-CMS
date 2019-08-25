import React, { Component } from 'react';
import { Avatar, Row, Col, Input, Button, Modal, message } from 'antd';
import axios from 'axios';
import Cookie from 'js-cookie';

const { confirm } = Modal;

// const info = [
//   {
//     title: '身份证号码',
//     content: '****************',
//   },
//   {
//     title: '手机号码',
//     content: '****************',
//   },
//   {
//     title: 'QQ',
//     content: '****************',
//   },
//   {
//     title: '学号',
//     content: 'GZ190513002',
//   },
//   {
//     title: '毕业学院',
//     content: '华南师范大学 网络学院',
//   },
//   {
//     title: '在校状态',
//     content: '非应届',
//   },
//   {
//     title: '学历',
//     content: '专科',
//   },
//   {
//     title: '千锋班级',
//     content: '广州HTML5就业班1905期',
//   },
//   {
//     title: '招生老师',
//     content: '曾伟兰',
//   },
//   {
//     title: '报名日期',
//     content: '2019-03-28',
//   }
// ]

export default class Mine extends Component {
  state = {
    username: Cookie.get('username'),
    bool: false,
    info: [],
    idVal: '',
    telVal: '',
    qqVal: '',
    stuId: '',
    college: '',
    status: '',
    education: '',
    class: '',
    teach: '',
    time: ''
  }

  change1(e) {
    this.setState({
      idVal: e.target.value
    })
  }
  change2(e) {
    this.setState({
      telVal: e.target.value
    })
  }
  change3(e) {
    this.setState({
      qqVal: e.target.value
    })
  }
  change4(e) {
    this.setState({
      stuId: e.target.value
    })
  }
  change5(e) {
    this.setState({
      college: e.target.value
    })
  }
  change6(e) {
    this.setState({
      status: e.target.value
    })
  }
  change7(e) {
    this.setState({
      education: e.target.value
    })
  }
  change8(e) {
    this.setState({
      class: e.target.value
    })
  }
  change9(e) {
    this.setState({
      teach: e.target.value
    })
  }
  change10(e) {
    this.setState({
      time: e.target.value
    })
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    await axios.post('http://localhost:3000/getdata/getdata', {
      param: 'mine',
      name: this.state.username
    }).then((response) => {
      // console.log(response.data.data)
      if(response.data.data.length < 1){
        this.setState({ 
          info:[{title:'没有此人资料记录！',content:'要不自己提交一个？'}]},
        )
      }else {
        this.setState({ info: response.data.data[0].info });
      }
    });
  }

  updata() {
    this.setState({
      disabled: !this.state.disabled,
      bool: !this.state.bool
    });
  }


  savedata() {
    let name = this.state.username;
    let idVal = this.state.idVal;
    let telVal = this.state.telVal;
    let qqVal = this.state.qqVal;
    let stuId = this.state.stuId;
    let college = this.state.college;
    let status = this.state.status;
    let education = this.state.education;
    let classes = this.state.class;
    let teach = this.state.teach;
    let time = this.state.time;

    let url = '';
    if(this.state.info.length < 3) {
      url = 'http://localhost:3000/mineadd/mineadd'
    }else {
      url = 'http://localhost:3000/mine/mine';
    }

    confirm({
      title: '个人资料修改',
      content: '你确定要提交吗？',
      async onOk() {
        await axios.post(url, {
          name,
          info: [
            {
              title: '身份证号码',
              content:idVal
            },
            {
              title: '手机号码',
              content:telVal
            },
            {
              title: 'QQ',
              content:qqVal
            },
            {
              title: '学号',
              content:stuId
            },
            {
              title: '毕业学院',
              content:college
            },
            {
              title: '在校状态',
              content:status
            },
            {
              title: '学历',
              content:education
            },
            {
              title: '千锋班级',
              content:classes
            },
            {
              title: '招生老师',
              content:teach
            },
            {
              title: '报名日期',
              content:time
            }
          ]
        }).then((response) => {
          message.success('修改成功！', 1);
          // this.getData();
          window.location.reload();
        })
        // .catch((error) => {
        //   // message.error('修改出错！', 1)
        //   message.success('修改成功！', 1);
         
        //   this.getData();
        // })
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => { });
      },
      
      onCancel() { },
    });
    setTimeout(()=>{
      this.setState({
        bool: !this.state.bool
      });
    },2000)
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <div className="portrait" style={{ width: '100%', height: 280, position: 'relative' }}>
          <Avatar shape="square" size={160} icon="user" style={{ position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)' }} />
        </div>
        <div style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 20, textAlign: 'center' }}>
          <div style={{ display: this.state.bool ? 'none' : 'block' }}>
            {this.state.info.map((item, index) => {
              return (<Row data-id={index} key={index}>
                <Col span={11} style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>
                  {item.title} :
                        </Col>
                <Col span={8} style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                  <Input size="small" defaultValue={item.content} style={{ width: 200 }} />
                </Col>
              </Row>)
            })}
          </div>

          {/* 修改 */}
          <div style={{ display: !this.state.bool ? 'none' : 'block' }}>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>身份证号码 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change1.bind(this)} value={this.state.idVal} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>手机号码 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change2.bind(this)} value={this.state.telVal} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>QQ :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change3.bind(this)} value={this.state.qqVal} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>学号 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change4.bind(this)} value={this.state.stuId} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>毕业学院 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change5.bind(this)} value={this.state.college} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>在校状态 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change6.bind(this)} value={this.state.status} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>学历 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change7.bind(this)} value={this.state.education} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>千峰班级 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change8.bind(this)} value={this.state.class} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>招生老师 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change9.bind(this)} value={this.state.teach} style={{ width: 200 }} />
              </div>
            </div>
            <div data-id="0" className="ant-row">
              <div className="ant-col ant-col-11" style={{ textAlign: 'right', paddingRight: 10, lineHeight: 3 }}>报名日期 :</div>
              <div className="ant-col ant-col-8" style={{ textAlign: 'left', paddingLeft: 5, lineHeight: 3 }}>
                <Input size="small" onChange={this.change10.bind(this)} value={this.state.time} style={{ width: 200 }} />
              </div>
            </div>
          </div>


          <p style={{ paddingLeft: '40%', marginTop: 30, paddingBottom: 80 }}>
            <span style={{ display: 'block' }}>
              <Button onClick={this.updata.bind(this)} style={{ width: 300, display: this.state.bool ? 'none' : 'block' }} type="primary">修改资料</Button>
              <Button onClick={this.savedata.bind(this)} style={{ width: 300, display: !this.state.bool ? 'none' : 'block' }} type="primary">保存设置</Button>
            </span>
          </p>
        </div>
      </div>
    )
  }
}