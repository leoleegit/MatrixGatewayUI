import React from 'react';
import {Input, Spin} from 'antd';   
import { ProFormText } from '@ant-design/pro-form';  

const loading = (
  <span>
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  </span>
); 


class ProFormImageCaptcha extends React.Component { 
    componentDidMount(){
      this.props.onClickImage();
    }
    
    render() {
      return (
        <span>
        <Input.Group compact >
          <ProFormText {...this.props}/> 
             {!this.props.imageData && (loading)} 
             {this.props.imageData && (<img style={{width: '25%', height: '40px', marginLeft: 8,  verticalAlign: 'middle', padding: '0px 0px 0px 0px'}}
                    src={this.props.imageData} onClick={this.props.onClickImage}/>)}
        </Input.Group>
      </span>
      );
    }
    
  }

export default ProFormImageCaptcha;