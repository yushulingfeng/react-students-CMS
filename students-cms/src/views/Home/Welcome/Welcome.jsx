import React, { Component } from 'react';
import { Layout, } from 'antd';

const { Content } = Layout;

export default class Welcome extends Component {
  state = {
    size: 'large',
  }
  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 780
          }}
        >
          <div style={{width:'100%',height:500,display:'flex', justifyContent: 'center',alignItems:'center',fontSize:20,fontWeight:700}}>
              <h2 style={{color:'red'}}>欢迎来到后台！</h2>
          </div>
        </Content>
      </Layout>
    )
  }
}