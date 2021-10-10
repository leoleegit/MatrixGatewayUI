import React, { } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Card, Space} from 'antd'; 
import { PageContainer } from '@ant-design/pro-layout'; 
import TableRole from './components/TableRole';
import EditRole from './components/EditRole';
import AssignPermission from './components/AssignPermission'
import { createRole, roleList, updateRole, deleteRole, rolePermissionList } from '@/services/ant-design-pro/api2';  

const getRolePermissionList = async (key) => {
  try {
      const data = await rolePermissionList({roleId:key}); 
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

class RoleManage extends React.Component {  
  state = {
    showAssignPermission:false, 
    assignPermissionRole:undefined,
    showAdd:false,
    drawerData:{},
    tableData:[],
    tablePagination:{},
    loading:false
  }

  setCheckedItem = undefined;

 loadData = (params = {}) => {  
    this.setState({
      loading:true
    }); 
    roleList({
      results: 10,
      ...params,
    }).then((data) => { 
      const {tablePagination} = this.state; 
      tablePagination.total = data.count;
      this.setState({
        loading:false,
        tablePagination,
        tableData:data.results
      });   
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const {pager} = this.state;  
    pager.current = pagination.current; 
    this.setState({ 
      tablePagination:pager
    });  
    this.loadData({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };  

  componentDidMount(){ 
    this.loadData({});
  }

  del = (id) => {
    const { confirm } = Modal;
    confirm({
      title: 'Delete Permission',
      content: (<>Please confirm delete action</>),
      okText:"Confirm",
      onOk: ()=>{
          deleteRole({id}).then((data) => {   
              if(data.code === 200){
                  message.success("Delete Role Successful");
              }else
                  message.error("Delete Role Failure");
              this.setState({
                drawerData:{},
                showAdd:false
              });
              this.loadData({});
          })
      }
  });
  }

  edit = (value) => { 
    this.setState({
      drawerData:value,
      showAdd:true
    }) 
  }

  add = () => { 
    this.setState({
      drawerData:{},
      showAdd:true
    }) 
  }

  submit = (value) => {
    if(!value.id){
      createRole({ ...value}).then((data) => {
          if(data.code === 200){
              message.success("Add Role Successful");
          }else
              message.error("Add Role Failure");
          this.setState({showAdd:false}) 
          this.loadData({});
      })
    }else{
      updateRole({ ...value}).then((data) => {
          if(data.code === 200){
              message.success("Update Role Successful");
          }else
              message.error("Update Role Failure");
          this.setState({showAdd:false}) 
          this.loadData({});
      })
    }
   
  }

  assignPermission = (value) => { 
    getRolePermissionList(value.id).then((data) => {
      this.setCheckedItem(data);
      this.setState({assignPermissionRole:value,showAssignPermission:true});
    })  
  }

  onRef = (setCheckedKey) => {
    this.setCheckedItem = setCheckedKey;
  }

  render() {
    return (
        <PageContainer> 
        <Card>
            <Space>
                <Button type="primary" onClick={this.add} >
                    <PlusOutlined />Add
                </Button>  
            </Space> 
        </Card>
        <Card>
          <TableRole 
              dataSource={this.state.tableData}
              pagination={this.state.tablePagination}
              loading={this.state.loading}
              edit={this.edit}
              assignPermission={this.assignPermission}
          />
        </Card>
        <EditRole  
              setShowAdd={()=>{this.setState({showAdd:false})}}
              visible={this.state.showAdd} 
              delete={this.del}
              drawerData={this.state.drawerData}
              onSubmit={this.submit}
          /> 
        <AssignPermission
            visible={this.state.showAssignPermission}
            close={()=>{this.setState({showAssignPermission:false,assignPermissionRole:undefined,checkedPermissionRole:[]})}}
            assignPermissionRole={this.state.assignPermissionRole}
            checkedPermissionRole={this.state.checkedPermissionRole}
            onRef={this.onRef}
        />
      </PageContainer>
    );
  }
}

export default RoleManage;
