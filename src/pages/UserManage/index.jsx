import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import EditUser from './components/EditUser'; 
import AssignRoleAvatar from './components/AssignRole'; 
import ProTable from '@ant-design/pro-table'; 
import { userList, createUser, userResetPasswd, createRoleUser, roleList } from '@/services/ant-design-pro/api2'; 
import Moment from 'moment'; 
 
 

const TableList = () => {  
  const { confirm } = Modal;
  const [loading, setLoading] = useState(true);
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(false);
  const [newDrawer, setNewDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  const [showAssignRole, setShowAssignRole] = useState(false);

  const actionRef = useRef(); 
 
  const showAssignRoleAction = (record) =>{
    setCurrentRecord(record)
    setShowAssignRole(true)
  }

  const assignRole = (value) =>{
    createRoleUser({userId:currentRecord.id,roleId:value}).then((data) => {   
        if(data.code === 200){
            message.success("Assign Role Successful");
        }else
            message.error("Assign Role Failure");
        setShowAssignRole(false); 
        actionRef.current.reload();
    })
  }

  const resetPassword = (record) =>{
    confirm({
      title: `Reset ${ record.username }'s password`,
      content: (<>Please confirm reset password</>),
      okText:"Confirm",
      onOk: ()=>{
        userResetPasswd({},{id:record.id}).then((data) => {   
              if(data.code === 200){
                  message.success("Reset Password Successful");
              }else
                  message.error("Reset Password Failure"); 
          })
      }
  });
  }

  const loadRoleData = async ()=> {
    try {
        const data = await roleList({}); 
        if (data.code === 200) {
            if(data.results){ 
                return data.results;
            }
            return []; 
        }
      } catch (error) { 
        return []; 
      } 
      return []; 
  }

  const columns = [
    {
      title: 'Avatar',
      valueType: 'avatar', 
      dataIndex: 'avatarUrl',
      key:'avatarUrl',
      hideInSearch: true, 
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key:'username',
      hideInSearch: true,
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key:'nickname',
      hideInSearch: true,
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key:'telephone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key:'email',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key:'sex',
      hideInSearch: true,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          { record.sex ===1?'Male':'Female'}
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      key:'roleName', 
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: roleData,
    },
    {
      title: 'Update At',
      dataIndex: 'updated_at',
      key:'updated_at',
      sorter: true,
      valueType: 'dateTime', 
      hideInSearch: true,
      render: (text, record) => (
        <>{ new Moment(new Date(record.updatedAt)).format('YYYY-MM-DD HH:mm')}</>
      )
    }, 
    {
      title: 'Action',
      valueType: 'option', 
      render: (text, record, _, action) => (
        <Space size="middle"> 
          <a onClick={()=>{showAssignRoleAction(record)}}>Assign Role</a>  
          <a onClick={()=>{resetPassword(record)}}>Reset Password</a>  
        </Space>
      ),
    }
  ]; 

  const loadData = async (params,sort,filter)=>{ 
    let option = params;
    if(sort){
      const key= Object.keys(sort)[0];
      const value= Object.values(sort)[0]; 
      if(key && value)
        option = {...option,sortField:key,'sort':value==='ascend'?'asc':'desc'}
    } 

    try {
      const data = await userList(option); 
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
    return {
      data:[],
      success:true,
      total:0
    };
  }

  const submit = (value)=>{  
    const sex = value.sex === 0? 0 : 1;
    createUser({ ...value,sex}).then((data) => {
      if(data.code === 200){
          message.success("Create User Successful");
      }else
          message.error(data.msg);
      setNewDrawer(false) 
      actionRef.current.reload();
  })

  }

  useEffect (()=>{
    if(loading){  
      loadRoleData().then((data)=>{ 
          setLoading(false); 
          const RoleData = {};
          const RoleOptionData = [];
          data.forEach(element => {
            RoleData[element.name] = {text: element.name} 
            RoleOptionData.push({title:element.id,value:element.name});
          }); 
          setRoleData(RoleData);
          setRoleOptions(RoleOptionData);
      }); 
    }

},[loading]);
  return (
    <PageContainer>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
               setDrawerData({})
               setNewDrawer(true)
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.userManage.new" defaultMessage="New" />
          </Button>,
        ]}
        request={loadData}
        columns={columns} 
      />  
      <EditUser 
        setShowAdd={()=>{setNewDrawer(false)}}
        visible={newDrawer}  
        drawerData={drawerData}
        onSubmit={submit}
      /> 
      <AssignRoleAvatar 
        roleData={roleData}
        setAssignRole={()=>{setShowAssignRole(false)}}
        visible={showAssignRole}  
        currentRecord={currentRecord}
        options={roleOptions}
        onSubmit={assignRole}
      />
    </PageContainer>
  );
};

export default TableList;
