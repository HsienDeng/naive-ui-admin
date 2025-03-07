import { http } from '@/utils/http/axios';

/**
 * 登录
 * @param data
 * @returns
 */
export function login(data) {
  return http.post({
    url: '/login',
    data,
  });
}
