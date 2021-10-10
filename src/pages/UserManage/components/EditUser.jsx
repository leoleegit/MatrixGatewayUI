

import React from 'react';
import { Drawer, Form, Button, Col, Row, Input,  Space, Select } from 'antd'; 

const { Option } = Select;

const AddDrawer = (props) => { 
    const formRef = React.createRef();
    const onClose = () => {
        props.setShowAdd(false);
    };    
    
    return (
        <Drawer  
            visible={props.visible}
            title="New User"  
            width={720} 
            onClose={()=>{  
                props.setShowAdd(false); 
            }}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={()=>{
                         formRef.current.submit();
                    }} type="primary">
                        Submit
                    </Button>
                    {
                        props.drawerData.id && <Button   onClick={()=>{
                            props.delete(props.drawerData.id);
                        }} type="danger">
                            Delete
                        </Button>
                    } 
                </Space>
            } 
            closable={false}
            maskClosable={false}
            destroyOnClose={true}
            >
            <Form ref={formRef} layout="vertical" hideRequiredMark onFinish={props.onSubmit}> 
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please enter username' }]}
                        >
                        <Input defaultValue={props.drawerData.username} placeholder="Please enter username" />
                        </Form.Item>
                    </Col> 
                    <Col span={12}>
                        <Form.Item
                            name="nickname" 
                            label="Nickname"
                            rules={[{ required: true, message: 'Please enter nicknamee' }]}
                        >
                        <Input defaultValue={props.drawerData.nickname} placeholder="Please enter nickname"/>
                        </Form.Item>
                    </Col> 
                </Row> 
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="telephone"
                            label="Telephone"
                            rules={[{ required: false, message: 'Please enter telephone' }]}
                        >
                        <Input defaultValue={props.drawerData.telephone} placeholder="Please enter telephone" />
                        </Form.Item>
                    </Col> 
                    <Col span={12}>
                        <Form.Item
                            name="email" 
                            label="Email"
                            rules={[{ required: false, message: 'Please enter email' }]}
                        >
                        <Input defaultValue={props.drawerData.email} placeholder="Please enter email"/>
                        </Form.Item>
                    </Col> 
                </Row>
                <Row gutter={16}> 
                    <Col span={12}>
                        <Form.Item
                         name="sex"
                         label="Sex" 
                        >
                        <Select defaultValue={props.drawerData.sex===0?'Female':'Male'}> 
                            <Option value="1">Male</Option>
                            <Option value="0">Female</Option> 
                        </Select>
                        </Form.Item>
                    </Col>
                </Row>
                    <Form.Item
                        name="id" 
                    >
                    <Input defaultValue={props.drawerData.id} hidden={true}/>
                    </Form.Item> 
          </Form>
        </Drawer>
    );
}

export default AddDrawer;