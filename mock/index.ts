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
    url: '/dev-api/login',
    method: 'post',
    response: (data) => {
      if (data.body.username !== 'admin') {
        return {
          code: 400,
          msg: '账号密码错误!',
          data: null,
        };
      }
      return {
        code: 200,
        msg: '登录成功',
        data: data.body,
      };
    },
  },
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
