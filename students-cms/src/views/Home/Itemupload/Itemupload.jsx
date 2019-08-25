import React, { Component } from 'react';
import { Layout, Breadcrumb,Button,Divider } from 'antd';
const { Content } = Layout;

export default class Itemupload extends Component {
  state={
    size: 'large'
  }
  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>学员后台</Breadcrumb.Item>
          <Breadcrumb.Item>项目上传</Breadcrumb.Item>
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
            <h2 style={{textAlign:'center',fontWeight:700}}>学员项目上传</h2>
            <Divider />
            <div style={{width:'100%',height:200,padding:50, border: '1px solid #ccc'}}>
              <p style={{width:800,margin:'auto'}}>
              <span style={{ fontSize: '13px', color: 'red'}}>项目文件：</span>
              <input type="file" name="文件上传" id=""/>
              <span style={{ fontSize: '13px', color: 'red',fontWeight:700}}>注：请上传格式为【zip,rar】的压缩包,上传大小不得超过10M！</span>
              </p>
              <p style={{ width: 250, display: 'flex', justifyContent: 'space-between',margin:'auto' ,marginBottom:30,marginTop:50}}>
                <Button type="primary" icon="check" size={this.state.size}>
                  提交
                </Button>
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