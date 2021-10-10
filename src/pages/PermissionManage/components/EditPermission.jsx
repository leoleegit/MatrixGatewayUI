import React from 'react';
import { Space, Form, Button, Col, Row, Input, Select } from 'antd';

const { Option } = Select;

const EditPermission = ({ parentCode, onSubmit, status, del, formRef }) => { 
    const {INIT,EDIT,FUNCTION} = {"INIT":"INIT","ADD":"ADD","EDIT":"EDIT","FUNCTION":"FUNCTION"}
    return (
        <>
        <Row>
            <Col span={24}>
                 <Form form={formRef} layout="vertical" hideRequiredMark onFinish={onSubmit}>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                    name="rootId" 
                    label="Parent Node" 
                >
                <Input disabled/>
                </Form.Item>
                <Form.Item hidden
                    name="id"  
                >
                <Input disabled />
                </Form.Item>
            </Col>  
        </Row>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                    name="code" 
                    label="Permission Code"
                    rules={[{ required: true, message: 'Please enter permission code' }]}
                >
                <Input placeholder="Permission code"  disabled={status===INIT}
                                 addonBefore={parentCode}
                            />
                </Form.Item>
            </Col> 
            <Col span={12}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter permission name' }]}
                >
                <Input placeholder="Permission name" disabled={status===INIT} />
                </Form.Item>
            </Col> 
        </Row>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                name="path"
                label="Path" 
                >
                <Input placeholder="Permission path" disabled={status===INIT} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                 name="method"
                 label="Method" 
                >
                <Select disabled={status===INIT}>
                    <Option selected value="ALL">ALL</Option>
                    <Option value="GET">GET</Option>
                    <Option value="POST">POST</Option>
                    <Option value="HEAD">HEAD</Option>
                    <Option value="PUT">PUT</Option>
                    <Option value="PATCH">PATCH</Option>
                    <Option value="DELETE">DELETE</Option>
                    <Option value="OPTIONS">OPTIONS</Option>
                    <Option value="TRACE">TRACE</Option>
                </Select>
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
                    message: 'please enter permission description',
                    },
                ]}
                >
                <Input.TextArea rows={2} placeholder="Permission description" disabled={status===INIT}/>
                </Form.Item>
            </Col>
        </Row>
         <Row gutter={16} hidden={status===FUNCTION}>
             <Col span={24}> 
             <Space> 
                    {status!==INIT && <Button onClick={()=>{
                        formRef.submit(); 
                    }} type="primary">
                        Submit
                    </Button>}
                    {
                        status===EDIT && <Button onClick={del} type="danger">
                            Delete
                        </Button>
                    } 
                </Space>
             </Col>
         </Row>
        </Form>
            </Col>
        </Row> 
         </>
    )
} 

export default EditPermission;

