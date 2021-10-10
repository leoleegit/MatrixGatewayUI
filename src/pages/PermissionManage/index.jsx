
import React, { useState, useLayoutEffect, useRef } from 'react';
import { Modal, Button,  Tree, Space, message, Row, Col, Form, Card, Input } from 'antd'; 
import { PageContainer } from '@ant-design/pro-layout';  
import EditPermission from './components/EditPermission'; 
import FunctionList from './components/FunctionList'; 
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { permissionList, createPermission, updatePermission, deletePermission } from '@/services/ant-design-pro/api2';   
import styles from './index.less';

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

  const postPermission = async (body) => {
    try {
        const data = await createPermission(body); 
        return data;
      } catch (error) { 
        return {};
      }  
  }

  const putPermission = async (body) => {
    try {
        const data = await updatePermission(body); 
        return data;
      } catch (error) { 
        return {};
      }  
  } 
  

const PermissionList = () => {  
    const {INIT,ADD,EDIT} = {"INIT":"INIT","ADD":"ADD","EDIT":"EDIT"}
    const [form] = Form.useForm();
    const tableRef   = useRef(); 
    const { confirm } = Modal; 
    const [treeData, setTreeData] = useState([]);  
    const [expandedKeys,setExpandedKeys] =  useState([]);
    const [parentCode, setParentCode] = useState();
    const [status, setStatus] = useState(INIT);  
    const [selected, setSelected] = useState(undefined); 
    const [searchValue, setSearchValue] = useState('');

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

    const reloadTree = () =>{
        setStatus(INIT);
        setParentCode(undefined);
        form.resetFields();
        getTreeData().then((data) => { 
            setTreeData(data);
            const keys = [];
            data.forEach(element => { 
                resetExpandedKeys(keys,element);
            }); 
            setExpandedKeys(keys); 
        }) 
    } 

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

    const add = () =>{  
        setStatus(ADD); 
        if(selected){ 
            const {id,code} = selected; 
            form.resetFields();
            if(id){
                form.setFieldsValue({'rootId':id}); 
                setParentCode(`${code}:`)
            }
        } 
    }

    const showEdit = () =>{
        setStatus(EDIT); 
        if(selected){ 
            let pCode;
            let {code} = selected;
            if(code && code.indexOf(":")!==-1){
                pCode = code.substring(0,code.lastIndexOf(":")+1);
                code  = code.substring(code.lastIndexOf(":")+1,code.length); 
            }
            setParentCode(pCode)
            form.setFieldsValue({...selected,code});
            tableRef.current.reload();
        }
    }

    const onSelect = (selectedNode) => { 
        setSelected(selectedNode);
        setStatus(INIT);
        if(selectedNode){ 
            let pCode;
            let {code} = selectedNode;
            if(code && code.indexOf(":")!==-1){
                pCode = code.substring(0,code.lastIndexOf(":")+1);
                code  = code.substring(code.lastIndexOf(":")+1,code.length); 
            }
            setParentCode(pCode)
            form.setFieldsValue({...selectedNode,code});
        }else{
            setParentCode(undefined)
            form.resetFields();
        } 
    }

    const del = () => {  
        const {id} = form.getFieldsValue(); 
        if(id){
            confirm({
                title: 'Delete Permission',
                content: (<>Please confirm delete action</>),
                okText:"Confirm",
                onOk: ()=>{
                    deletePermission({'id':id}).then((data) => {   
                        if(data.code === 200){
                            message.success("Delete Permission Successful");
                        }else
                            message.error("Delete Permission Failure"); 
                        reloadTree()
                    })
                }
            });
        }  
    }  

    const submit = (value) => { 
        if(status===ADD){ 
            postPermission({ ...value,'code':`${(parentCode || '')}${value.code}` }).then((data) => {
                if(data.code === 200){
                    message.success("Add Permission Successful");
                }else
                    message.error("Add Permission Failure");  
                reloadTree();
            })
        }else if(status===EDIT){  
            putPermission({...value,'code':`${(parentCode || '')}${value.code}`}).then((data) => {
                if(data.code === 200){
                    message.success("Update Permission Successful");
                }else
                    message.error("Update Permission Failure"); 
                reloadTree();
            })
        }
        return false;
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
        <PageContainer>   
            <Card>
                <Space>
                    <Button type="primary" onClick={add}>
                        <PlusOutlined />Add
                    </Button> 
                    <Button onClick={showEdit} disabled={!selected}>
                        <EditOutlined />Edit
                    </Button> 
                </Space> 
            </Card> 
            <Card> 
              <Row gutter={24}>
                <Col span={8}>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} /> 
                <Tree  showLine={true} treeData={loop(treeData)} expandedKeys={expandedKeys} autoExpandParent={true}  
                    onSelect={(selectedKeys,selectedNode)=>{  
                        if(selectedNode.selected)
                            onSelect(selectedNode.node)
                        else
                            onSelect(undefined)    
                    }}
                 /></Col>
                <Col span={16}>
                    <EditPermission    
                        del={del}
                        parentCode={parentCode}
                        onSubmit={submit} 
                        status={status}
                        formRef={form}
                    />
                    <FunctionList
                        actionRef={tableRef}
                        className={styles.tableBorder}
                        rootId={selected?.id}
                        parentCode={selected?.code}
                        status={status}
                    />
                </Col>
              </Row> 
            </Card> 

        </PageContainer>
    )
}

export default PermissionList;