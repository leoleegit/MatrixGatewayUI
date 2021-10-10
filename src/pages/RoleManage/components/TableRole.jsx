import React from 'react'; 
import { Table, Space } from 'antd'; 
import Moment from 'moment'; 



const TableRole = (props) => {     
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name', 
      key:'name',
    },
    {
      title: 'Code',
      dataIndex: 'code', 
      key:'code',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key:'desc',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key:'updatedAt',
      valueType: 'dateTime', 
      render: (text, record) => (
         <>{ new Moment(new Date(record.updatedAt)).format('YYYY-MM-DD HH:mm')}</>
      )
    },
    {
      title: 'Action', 
      key:'Action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>{props.edit(record)}}>Edit</a> 
          <a onClick={()=>{props.assignPermission(record)}}>Assign Permission</a>
        </Space>
      ),
    }
  ]; 

  return (
      <Table  
        rowKey="id"
        columns={columns} 
        dataSource={props.dataSource}
        pagination={props.pagination}
        loading={props.loading}
        onChange={props.handleTableChange}
      />
  )
}

export default TableRole;
