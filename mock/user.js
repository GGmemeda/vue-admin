const tokens = {
  admin: {
    token: 'admin'
  },
};

const users = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    avatar: '',
    name: 'Admin'
  },
};

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const {username} = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        };
      }

      return {
        code: 20000,
        data: token
      };
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const {token} = config.query;
      const info = users[token];
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        };
      }

      return {
        code: 20000,
        data: info
      };
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      };
    }
  }
];
