import Mock from 'mockjs';

const res = Mock.mock({
  id: '@id',
  username: 'Admin',
  date: '@date',
  avatar: '@image("200x200", "red", "#fff", "avatar")',
  description: '熊越是傻逼啊!',
});

export default [
  {
    url: '/dev-api/user/userinfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: res,
        msg: '查询成功!',
      };
    },
  },
];
