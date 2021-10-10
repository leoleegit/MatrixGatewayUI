

import React from 'react';
import { Drawer, Form, Button, Col, Row, Input,  Space } from 'antd'; 

const AddDrawer = (props) => { 

    const onClose = () => {
        props.setShowAdd(false);
    };    
    
    return (
        <Drawer  
            visible={props.visible}
            title="Role"  
            width={720} 
            onClose={()=>{  
                props.setShowAdd(false); 
            }}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={()=>{
                        document.getElementById('form-id').click();
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
            <Form initialValues={props.drawerData}  layout="vertical" hideRequiredMark onFinish={props.onSubmit}> 
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter role name' }]}
                        >
                        <Input defaultValue={props.drawerData.name} placeholder="Please enter role name" />
                        </Form.Item>
                    </Col> 
                    <Col span={12}>
                        <Form.Item
                            name="code" 
                            label="Role Code"
                            rules={[{ required: true, message: 'Please enter role code' }]}
                        >
                        <Input defaultValue={props.drawerData.code} placeholder="Please enter role code" disabled={!!props.drawerData.code}/>
                        </Form.Item>
                    </Col> 
                </Row> 
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                        name="desc"
                        label="Description"
                        rules={[
                            {
                            required: true,
                            message: 'please enter role description',
                            },
                        ]}
                        >
                        <Input.TextArea rows={2} defaultValue={props.drawerData.desc} placeholder="please enter role description" />
                        </Form.Item>
                    </Col>
                </Row>
                        <Form.Item
                            name="id" 
                        >
                        <Input defaultValue={props.drawerData.id} style={{display:'none'}}/>
                        </Form.Item>
                <Button id="form-id" type="primary" htmlType="submit" style={{display:'none'}}>
                    Submit
                </Button>
          </Form>
        </Drawer>
    );
}

export default AddDrawer;