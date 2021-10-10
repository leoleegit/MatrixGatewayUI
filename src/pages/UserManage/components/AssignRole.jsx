
import React, { useState } from 'react';
import { Drawer, Form, Button,Col, Row, Space, Select } from 'antd';  
 

const AddDrawer = (props) => {  
    const [select, setSelect] = useState(); 
 

    const onClose = () => {
        props.setAssignRole(false);
        setSelect(undefined);
    };    
    
    return (
        <Drawer  
            visible={props.visible}
            title="Assign Role"  
            width={320} 
            onClose={()=>{  
                props.setAssignRole(false); 
            }}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={()=>{
                        if(select)
                            props.onSubmit(select);
                        else
                            props.setAssignRole(false); 
                    }} type="primary">
                        Submit
                    </Button> 
                </Space>
            } 
            closable={false}
            maskClosable={false}
            destroyOnClose={true}
            >
            <Form layout="vertical" hideRequiredMark>  
            <Row gutter={16}> 
                <Col span={24}>
                    <Form.Item
                        name="role"
                        label="Role" 
                        initialValue={props.currentRecord?.roleName}
                    >
                    <Select 
                        showSearch 
                        options={props.options} 
                        placeholder="Select a Role"
                        optionFilterProp="name" 
                        onSelect={(value,option) =>{setSelect(option.title)}}
                        filterOption={(input, option) =>{ 
                            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        } 
                        } />   
                    </Form.Item>
                </Col>
            </Row> 
          </Form>
        </Drawer>
    );
}

export default AddDrawer;