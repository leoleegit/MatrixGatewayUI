import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { Button, Upload, message, Avatar, Image } from 'antd';
import { userUpdate } from '@/services/ant-design-pro/api2';

import ProForm, {  
  ProFormText, 
} from '@ant-design/pro-form'; 
import styles from './BaseView.less'; 

const AvatarView = ({ avatar }) => {
  const [src, setUrl] = useState(avatar); 
  const { initialState, loading, setInitialState } = useModel('@@initialState'); 
  const {currentUser} = initialState;  
  return (
    <> 
      <Avatar className={styles.avatar}
         src={<Image src={src} />}
      />
      <Upload 
        accept={"image/*"}
        action={"/media/file/upload"}
        data={{'type':'image'}}
        headers={{Authorization:localStorage.getItem("token")}}
        maxCount={1}
        showUploadList={false}
        onChange={(info)=>{
          if (info.file.status === 'done') {
            const {response} = info.file;
            if(response.code===200){
                const avatarUrl = response.result.thumbUrl?response.result.thumbUrl:response.result.url;
                userUpdate({avatarUrl}).then((data) => {
                if(data.code === 200){ 
                  setUrl(avatarUrl)
                  const user   = {...currentUser.user,avatarUrl}; 
                  setInitialState((s) => ({ ...s,'currentUser':{...currentUser,user}})) 
                }else
                    message.error("Update Profile Image Failure");   
              })
            }else{
              message.error(`${info.file.name} file upload failed.`);
            }
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
        >
        
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            Change It
          </Button>
        </div>
      </Upload>
    </>
  );
}

const BaseView = () => {
  const { initialState, loading, setInitialState } = useModel('@@initialState'); 
  const {currentUser} = initialState;  
  const getAvatarURL = () => { 
    if (currentUser) {
      if (currentUser.user) {
        return currentUser.user.avatarUrl;
      } 
      return '/logo.svg';
    }

    return '';
  };

  const handleFinish = async (value) => {
    const {nickname,email,telephone} = value; 
   
    userUpdate(value).then((data) => {
      if(data.code === 200){ 
          const user   = {...currentUser.user,nickname,email,telephone}; 
          setInitialState((s) => ({ ...s,'currentUser':{...currentUser,user}}))
          message.success("Update Base Info Successful");
      }else
          message.error("Update Base Info Failure");   
    })
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div>
            <ProForm  
              layout="vertical"
              onFinish={handleFinish}
              submitter={{  
                resetButtonProps: {
                  style: { 
                    display: 'none',
                  },
                },
                submitButtonProps: {
                    style: { 
                      'marginLeft': '-8px'
                    },
                  },
              }} 
              initialValues={currentUser?.user}
              hideRequiredMark
            > 
              <ProFormText
                width="md"
                name="nickname"
                label="Nickname"
                placeholder="Please input your nickname"
                rules={[
                  {
                    required: true,
                    message: 'Please input your nickname',
                  },
                ]}
              />  
              <ProFormText
                width="md"
                name="email"
                label="Email"
                placeholder="Please input your email"
                rules={[
                  {
                    type: 'email',
                    message: 'Please input your email',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="telephone"
                label="Telephone"
                placeholder="Please input your telephone"
                rules={[
                  {
                    required: false,
                    message: 'Please input your telephone',
                  },
                ]}
              /> 
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
