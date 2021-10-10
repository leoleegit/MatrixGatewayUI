// @ts-ignore

/* eslint-disable */
import { request } from 'umi'; 
import md5 from 'md5';

export async function getFakeCaptcha(params, options) {
  return request('/admin/auth/captcha', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function login(body, options) {
  if('account'==body.type){
    body.authType = 1;
  }
  body.password = md5(body.password);
  return request('/admin/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
