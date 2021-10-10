import React, { useState } from 'react';
import { Form, Input, Button, List, message } from 'antd';  
import { updatePasswd } from '@/services/ant-design-pro/api2';
 

const SecurityView = () => {
  const [formRef] = Form.useForm();
  const [modifyPasswd, setModifyPasswd] = useState(false); 

  const onFinish = (values) => {
    updatePasswd(values).then((data) => {
      if(data.code === 200){  
          formRef.resetFields();
          setModifyPasswd(false)
          message.success("Update Password Successful");
      }else
          message.error(data.msg);   
    })
  }; 

  const cancel = () => {
    formRef.resetFields();
    setModifyPasswd(false)
  }
 
  const getData = () => [
    {
      title: 'Password',
      description: (
        <> 
        </>
      ),
      actions: [<a key="Modify" onClick={()=>{setModifyPasswd(true);}}>Modify</a>],
    }, 
  ];

  const data = getData();
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <Form 
      form={formRef} 
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish} 
      autoComplete="off"
      style={{padding: '10px', width: '350px', display:modifyPasswd?'block':'none'}}
    >  
      <Form.Item
        label="Current Password"
        name="currentPasswd"
        rules={[
          {
            required: true,
            message: 'Please input your current password!',
          },
        ]} 
      >
        <Input.Password />
      </Form.Item> 
      <Form.Item
        label="New Password"
        name="newPasswd"
        rules={[
          {  
            validator: (_, value) => {
              const regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
              const msg   = "Password of at least 8 characters, including at least 1 letter, at least 1 special character and at least 1 number"; 
              if (!value) {
                return Promise.reject(new Error('Please input your password'));
              }
              if(!regex.test(value))
                return Promise.reject(new Error(msg));
              return Promise.resolve();
            }
          }, 
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item> 
      <Form.Item
        label="Confirm Password"
        name="confirmPasswd"
        dependencies={['newPasswd']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPasswd') === value) {
                return Promise.resolve();
              } 
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]} 
        hasFeedback
      >
        <Input.Password />
      </Form.Item> 

      <Form.Item 
      >
        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
          Submit
        </Button>
        <Button htmlType="button" onClick={cancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default SecurityView;
