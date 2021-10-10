import React , {useState, useLayoutEffect, useRef} from 'react'; 
import { Tree, Drawer, Space, Button, message, Input, Row, Col } from 'antd';  
import ProTable from '@ant-design/pro-table'; 
import { permissionList, createRolePermission, permissionListFunction, createRolePermissionFunction} from '@/services/ant-design-pro/api2';   
import styles from '../index.less';  

const { Search } = Input;

const initChild = (element) => {  
    if(element.children){
      const childrenData = [];
      element.children.forEach(children => {
          childrenData.push(initChild(children));
      })
      return {...element,key:element.id,title:element.name,children:childrenData};
    }
    return {...element,key:element.id,title:element.name}; 
}

const getTreeData = async () => {
  try {
    const data = await permissionList({}); 
    if (data.code === 200) {
        if(data.results){
            const tempData = [];  
            data.results.forEach(element => { 
                tempData.push(initChild(element)); 
            });
            return tempData;
        }
        return []; 
    }
    } catch (error) { 
        return [];
    } 
    return [];
} 

const AssignPermission = (props) => {      
    const {INIT} = {"INIT":"INIT"}
    const [treeData, setTreeData] = useState([]);  
    const [expandedKeys,setExpandedKeys] =  useState([]);  
    const [checkedKeys, setCheckedKeys] = useState([]);   
    const [searchValue, setSearchValue] = useState('');  
    const [selected, setSelected] = useState(undefined); 
    const [selectedRowKeys,setSelectedRowKeys] = useState([]);  
    const tableRef   = useRef(); 
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
      ]; 

      const loadData = async (params,sort,filter)=>{ 
        const rootId = selected?.id;
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

    const resetExpandedKeys = (keys,data) =>{ 
        keys.push(data.key);
        if(data.children){
            data.children.forEach(element => { 
                resetExpandedKeys(keys,element);
            });
        }  
    }

    const getParentKey = (key, tree) => {
        let parentKey;
        tree.forEach((node)=>{
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }) 
        return parentKey;
    };

    useLayoutEffect (()=>{
        getTreeData().then((data) => {
            if(data.length>0)
                setTreeData(data);
            const keys = [];
            data.forEach(element => { 
                resetExpandedKeys(keys,element);
            }); 
            setExpandedKeys(keys); 
        }) 
    },[INIT]);  

    const filterId = (items)=>{ 
        const roleData = [];
        items.forEach(element => {
            if(element.type===0 || element.type===1)
                roleData.push(element.id);
        });
        return roleData;
    }

    const check = (value) => {
        setCheckedKeys(value);  
        setSelected(undefined) 
    } 

    if(props.onRef){
        props.onRef((value)=>{  
            setCheckedKeys(filterId(value))
            setSelected(undefined) 
        });
    } 

    const submit = () => { 
        createRolePermission({ roleId:props?.assignPermissionRole?.id, ids:checkedKeys}).then((data) => {
            if(data.code === 200){
                message.success("Update Role Permission Successful");
            }else
                message.error("Update Role Permission Failure");   
            props.close(); 
        })
    }

    const save = () =>{
        createRolePermissionFunction({ roleId:props?.assignPermissionRole?.id, rootId:selected?.id, ids:selectedRowKeys}).then((data) => {
            if(data.code === 200){
                message.success("Update Role Function Successful");
            }else
                message.error("Update Role Function Failure");    
        })
    }

    const filter = (keys,key,data)=>{
        if (data.title.toLocaleLowerCase().indexOf(key) > -1){
            const parent = getParentKey(data.key, treeData);
            if(parent)
                keys.push(parent);
        }
        if(data.children){
            data.children.forEach(element => { 
                filter(keys,key,element);
            });
        }  
    }

    const filterSelect = (dataSource) =>{  
        const data   = [];
        const roleId = props?.assignPermissionRole?.id;
        dataSource.forEach(element => { 
            if(element.roleId === roleId)
                data.push(element.id);
        });
        setSelectedRowKeys(data) 
    }

    const onChange = (e) => {
        const { value } = e.target;  
        const exKeys = [];
        treeData.forEach((data)=>{
            filter(exKeys,value.toLocaleLowerCase(),data);
        }); 
        setExpandedKeys(exKeys);
        setSearchValue(value) 
    }

    const loop = data =>
      data.map(item => {
        const index = item.title.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase());
        const title = (index>-1)?()=>{
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const keyWord  =  item.title.substring(index,index + searchValue.length);
            return (
                <span>
                {beforeStr}
                <span className={styles.treeSearchValue}>{keyWord}</span>
                {afterStr}
                </span>
            )
        }:()=>{
            return (
                <span>{item.title}</span>
            )
        } 
        if (item.children) {
          return { ...item, title, children: loop(item.children) };
        }

        return {...item, title};
      }); 
   
  return (
    <Drawer  
    visible={props.visible}
    title={`Assign ${props?.assignPermissionRole?.name} Permission`} 
    width={800} 
    onClose={()=>{   
        props.close(); 
    }}
    footer={
        <Space>
            <Button onClick={()=>{    
                props.close(); 
            }}>Cancel</Button>
            <Button onClick={submit} type="primary">
                Submit
            </Button> 
        </Space>
    } 
    bodyStyle={{ paddingBottom: 80 }} 
    closable={true}
    maskClosable={true}
    destroyOnClose={true}
    >  
        <Row gutter={24}>
            <Col span={8}>
               <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
                <Tree  
                checkable
                showLine={true} 
                treeData={loop(treeData)} 
                expandedKeys={expandedKeys} 
                autoExpandParent={true}  
                checkedKeys={checkedKeys}
                onCheck={check}
                onSelect={(selectedKeys,selectedNode)=>{  
                        if(selectedNode.selected){
                            setSelected(selectedNode.node);
                            setSelectedRowKeys([])
                            tableRef.current.reload();
                        }
                        else
                            setSelected(undefined)    
                    }}
            /></Col>
            <Col span={16}>
            <ProTable 
                defaultSize={"small"}
                className={styles.tableBorder}
                style={{display:selected?'block':'none'}}
                headerTitle='Function List'
                actionRef={tableRef}
                rowKey="id"
                search={false} 
                rowSelection={{
                    alwaysShowAlert:true,
                    selectedRowKeys,
                    preserveSelectedRowKeys:false,
                    onChange: (selectedKeys)=>{ 
                        setSelectedRowKeys(selectedKeys);
                      }, 
                    } 
                }
                onLoad={(dataSource)=>{
                    filterSelect(dataSource);   
                }}
                options={false}
                request={loadData}
                columns={columns} 
                toolBarRender={() => [
                <Button
                    type="primary"
                    key="primary" 
                    onClick={save}
                >
                    Save
                </Button>,
                ]} 
            /> 
            </Col>
        </Row>
    </Drawer>
  )
}

export default AssignPermission;
