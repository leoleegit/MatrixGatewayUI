import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Drawer, Form, Modal } from 'antd';
import React, { useState} from 'react';
import { FormattedMessage } from 'umi'; 
import ProTable from '@ant-design/pro-table'; 
import { permissionListFunction, createFunction, deletePermission,updatePermission} from '@/services/ant-design-pro/api2';   
import EditPermission from './EditPermission'; 

const TableList = ({rootId,parentCode,actionRef,className,status}) => {   
  const {EDIT} = {"INIT":"INIT","ADD":"ADD","EDIT":"EDIT"} 
  const [showEdit, setShowEdit] = useState(undefined); 
  const [selected, setSelected] = useState(undefined);  
  const [formRef] = Form.useForm();
  const { confirm } = Modal; 

  const edit = (record) =>{
    setSelected(record);
    let {code} = record;
    if(code && code.indexOf(":")!==-1){ 
        code  = code.substring(code.lastIndexOf(":")+1,code.length); 
    }
    formRef.setFieldsValue({...record,code});
    setShowEdit(true);
  }   

  const columns = [
    {
      title: 'id', 
      dataIndex: 'id',
      key:'id',
      hideInSearch: true, 
      hideInTable:true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key:'name', 
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key:'code',
      hideInSearch: true,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key:'method',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
          ALL:{text:'ALL'},
          GET:{text:'GET'},
          POST:{text:'POST'},
          HEAD:{text:'HEAD'},
          PUT:{text:'PUT'},
          PATCH:{text:'PATCH'},
          DELETE:{text:'DELETE'},
          OPTIONS:{text:'OPTIONS'},
          TRACE:{text:'TRACE'}
        },
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key:'path',
      hideInSearch: true,
      ellipsis:true,
    },  
    {
      title: 'Action',
      valueType: 'option', 
      render: (text, record, _, action) => (
        <Space size="middle"> 
          <a onClick={()=>{edit(record)}}>edit</a>   
        </Space>
      ),
    }
  ]; 

  const loadData = async (params,sort,filter)=>{ 
    if(rootId){
        let option = params;
        if(sort){
          const key= Object.keys(sort)[0];
          const value= Object.values(sort)[0]; 
          if(key && value)
            option = {...option,sortField:key,'sort':value==='ascend'?'asc':'desc'}
        } 
    
        try {
          const data = await permissionListFunction({...option,rootId}); 
          if (data.code === 200) {
              if(data.results){
                return {
                  data:data.results,
                  success:true,
                  total:data.count
                };
              } 
          }
        } catch (error) { 
           return {};
        } 
    }
     
    return {
      data:[],
      success:true,
      total:0
    };
  }

  const submit = (value)=>{  
    const go = value.id?updatePermission:createFunction;
    go({ ...value,'code':`${parentCode}:${value.code}` }).then((data) => {
      if(data.code === 200){
          message.success("Add Function Successful");
      }else
          message.error("Add Function Failure");  
          actionRef.current.reload();
          setShowEdit(false); 
    })
  } 

  const del = ()=>{
    const {id} = selected; 
    if(id){
        confirm({
            title: 'Delete Function',
            content: (<>Please confirm delete action</>),
            okText:"Confirm",
            onOk: ()=>{
                deletePermission({'id':id}).then((data) => {   
                    if(data.code === 200){
                        message.success("Delete Function Successful");
                    }else
                        message.error("Delete Function Failure"); 
                    actionRef.current.reload();
                    setShowEdit(false); 
                })
            }
        });
    } 
  }
  return (
    <> 
        <ProTable 
        className={className}
        style={{display:status===EDIT?'block':'none'}}
        headerTitle='Function List'
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            hidden={!rootId}
            onClick={() => {
              setSelected(undefined);
              formRef.resetFields();
              formRef.setFieldsValue({'rootId':rootId}); 
              setShowEdit(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.userManage.new" defaultMessage="New" />
          </Button>,
        ]} 
        options={false}
        request={loadData}
        columns={columns} 
      /> 
      <Drawer  
            visible={showEdit}
            title="Edit Function"  
            width={720} 
            onClose={()=>{  
                setShowEdit(false); 
            }}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <Space>
                    <Button onClick={()=>{setShowEdit(false);}}>Cancel</Button>
                    <Button onClick={()=>{
                         formRef.submit();
                    }} type="primary">
                        Submit
                    </Button>
                    {
                      selected && <Button   onClick={del} type="danger">
                            Delete
                        </Button>
                    } 
                </Space>
            } 
            closable={false}
            maskClosable={false}
            destroyOnClose={true}
            > 
            <EditPermission
              formRef={formRef}
              onSubmit={submit}
              status="FUNCTION"
              parentCode={`${parentCode}:`}
              del={del}
            />
        </Drawer>
    </> 
  );
};

export default TableList;
