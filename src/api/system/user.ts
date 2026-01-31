import { Alova } from '@/utils/http/alova/index';

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return Alova.Get<InResult>('/admin_info', {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

export interface UserInfo {
  nick_name: string;
  phone: string;
}
/**
 * @description: 用户登录
 */
export function login(params) {
  let result = Alova.Post<InResult<UserInfo>>(
    '/user/login',

    {
      nick_name: '321',
      phone: '13621019041',
    },
    {
      meta: {
        isReturnNativeResponse: true,
      },
    }
  );
  return result;
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return Alova.Post(`/user/u${uid}/changepw`, { params });
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return Alova.Post('/login/logout', {
    params,
  });
}
