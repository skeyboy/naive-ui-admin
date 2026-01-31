import { Alova } from '@/utils/http/alova';

export interface Paging {
  page: number;
  page_size: number;
}

export interface UserCreateReq {
  curr_address: string;
  address: string;
  age: number;
  is_admin: number;
  name: string;
  nick_name: string;
  phone: string;
}

export function createUser(params: UserCreateReq) {
  return Alova.Post<InApiResult>(
    '/user',
    {
      ...params,
    },
    {
      meta: {
        isReturnNativeResponse: true,
      },
    }
  );
}
//获取user list
export function getUserTableList(params: Paging) {
  return Alova.Post<InApiResult>(
    '/user/list',
    {
      page: 1,
      page_size: 12,
    },
    {
      meta: {
        isReturnNativeResponse: true,
      },
    }
  );
}
