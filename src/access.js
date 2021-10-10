/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { user,permissions } = (initialState?.currentUser )|| {user:{}};
   
  return {
    isAdmin: user.role === 'sys_admin',
    isSuper: user.role === 'sys_admin' || user.role === 'user_admin',
    hasPermission: (permission) =>{ 
      if(permissions){
        let canAccess = false;
        permissions.forEach(element => {
          if(element === permission){
            canAccess = true; 
          } 
        });
        return canAccess;
      }
      return false;
    }
  };
}
