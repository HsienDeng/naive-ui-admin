import { http } from '@/utils/http/axios';

export function login(data) {
  return http.post({
    url: '/login',
    data,
  });
}
