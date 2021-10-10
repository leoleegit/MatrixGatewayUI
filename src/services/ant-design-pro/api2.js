import { extend } from 'umi-request';
import md5 from 'md5';

let extendRequest;

export function initRequest() {
  extendRequest = extend({
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
}

if (localStorage.getItem('token')) {
  initRequest();
}

export async function outLogin(body, options) {
  return extendRequest('/admin/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function queryCurrentUser(options) {
  return extendRequest('/admin/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function userUpdate(body, options) {
  return extendRequest('/admin/user/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updatePasswd(body, options) {
  const data = { ...body, currentPasswd: md5(body.currentPasswd), newPasswd: md5(body.newPasswd) };
  return extendRequest('/admin/user/update/password', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function userList(body, options) {
  return extendRequest('/admin/user/list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function userResetPasswd(body, options) {
  return extendRequest('/admin/user/resetPassword', {
    method: 'POST',
    data: body,
    params: options,
    ...(options || {}),
  });
}

export async function createUser(body, options) {
  return extendRequest('/admin/user/create', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function permissionList(options) {
  return extendRequest('/admin/permission/list', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

export async function permissionListFunction(body, options) {
  return extendRequest('/admin/permission/list/function', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function permission(options) {
  return extendRequest('/admin/permission/info', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

export async function functionList(options) {
  return extendRequest('/admin/permission/functions', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createPermission(body, options) {
  return extendRequest('/admin/permission/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function createFunction(body, options) {
  return extendRequest('/admin/permission/add/function', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updatePermission(body, options) {
  return extendRequest('/admin/permission/update', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function deletePermission(options) {
  return extendRequest('/admin/permission/delete', {
    method: 'POST',
    params: options,
    ...(options || {}),
  });
}

export async function roleList(options) {
  return extendRequest('/admin/role/list', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

export async function createRole(body, options) {
  return extendRequest('/admin/role/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateRole(body, options) {
  return extendRequest('/admin/role/update', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function deleteRole(options) {
  return extendRequest('/admin/role/delete', {
    method: 'POST',
    params: options,
    ...(options || {}),
  });
}

export async function createRolePermission(body, options) {
  return extendRequest('/admin/role/permission/create', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function createRolePermissionFunction(body, options) {
  return extendRequest('/admin/role/permission/function/create', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function rolePermissionList(options) {
  return extendRequest('/admin/role/permission/list', {
    method: 'GET',
    params: options,
    ...(options || {}),
  });
}

export async function createRoleUser(body, options) {
  return extendRequest('/admin/role/user/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
