export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'permission.list',
    icon: 'safetyCertificate',
    path: '/permissionmanage',
    component: './PermissionManage',
    access:'isAdmin'
  },
  {
    name: 'role.list',
    icon: 'Team',
    path: '/rolemanage',
    component: './RoleManage',
    access:'isSuper'
  },
  {
    name: 'user.list',
    icon: 'user',
    path: '/usermanage',
    component: './UserManage',
    access:'isSuper'
  },
  {
    path: '/',
    redirect: '/welcome',
  }, 
  { 
    path: '/accountsettings',
    component: './AccountSettings',
  },
  { 
    component: './Welcome',
  },
  {
    component: './404',
  }, 
];
