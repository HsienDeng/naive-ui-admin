const Layout = () => import('@/layout/index.vue');

const routes = [
  {
    redirect: '/dashboard/main',
    path: '/',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      icon: 'system',
      hidden: true,
    },
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'main',
        meta: {
          title: '数据看板',
          icon: 'workbench',
        },
        name: 'DashboardMain',
        component: () => import('@/views/dashboard/main/index.vue'),
      },
    ],
  },
  {
    path: '/formGeneration',
    name: 'formGeneration',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'view-list',
        meta: {
          title: '表单生成',
          icon: 'file-code',
        },
        component: () => import('@/views/formGeneration/add/index.vue'),
      },
    ],
  },
  {
    path: '/component',
    name: 'UseComponent',
    component: Layout,
    meta: {
      title: '组件使用',
      icon: 'add-four',
    },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        meta: {
          title: '图标',
          icon: 'hamburger-button',
        },
        component: () => import('@/views/useComponent/icon/icon.vue'),
      },
      {
        path: 'table',
        name: 'Table',
        meta: {
          title: '表格',
          icon: 'table-file',
        },
        component: () => import('@/views/useComponent/table/table.vue'),
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'system',
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        meta: {
          title: '菜单管理',
          icon: 'application-menu',
        },
        component: () => import('@/views/system/menu-manager/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'user',
        },
        component: () => import('@/views/system/user-manager/index.vue'),
      },
    ],
  },
];
export default routes;
