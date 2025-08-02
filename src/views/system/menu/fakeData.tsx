import type { Menu } from '@/types/api'
export const fakeData: Menu.MenuItem[] = [
  {
    _id: 'menu1',
    menuName: '仪表盘',
    icon: 'DashboardOutlined',
    menuType: 1,
    menuState: 1,
    path: '/dashboard',
    component: 'Dashboard',
    menuCode: 'dashboard:view',
    createTime: '2023-01-10T09:00:00Z',
    children: [
      {
        _id: 'menu1_1',
        menuName: '数据概览',
        icon: 'AreaChartOutlined',
        menuType: 3,
        menuState: 1,
        path: '/dashboard/overview',
        component: 'DataOverview',
        menuCode: 'dashboard:overview',
        createTime: '2023-01-15T10:30:00Z'
      },
      {
        _id: 'menu1_2',
        menuName: '实时监控',
        icon: 'BarChartOutlined',
        menuType: 3,
        menuState: 1,
        path: '/dashboard/monitor',
        component: 'RealTimeMonitor',
        menuCode: 'dashboard:monitor',
        createTime: '2023-01-20T14:00:00Z'
      }
    ]
  },
  {
    _id: 'menu2',
    menuName: '系统管理',
    icon: 'SettingOutlined',
    menuType: 1,
    menuState: 1,
    path: '/system',
    component: 'SystemManagement',
    menuCode: 'system:view',
    createTime: '2023-02-01T08:45:00Z',
    children: [
      {
        _id: 'menu2_1',
        menuName: '用户管理',
        menuType: 3,
        menuState: 1,
        path: '/system/user',
        component: 'UserManagement',
        menuCode: 'system:user',
        createTime: '2023-02-05T11:20:00Z',
        buttons: [
          {
            _id: 'menu2_1_1',
            menuName: '新增用户',
            menuType: 2,
            menuState: 1,
            menuCode: 'user:add',
            createTime: '2023-02-10T13:15:00Z'
          },
          {
            _id: 'menu2_1_2',
            menuName: '编辑用户',
            menuType: 2,
            menuState: 1,
            menuCode: 'user:edit',
            createTime: '2023-02-10T13:20:00Z'
          },
          {
            _id: 'menu2_1_3',
            menuName: '删除用户',
            menuType: 2,
            menuState: 1,
            menuCode: 'user:delete',
            createTime: '2023-02-10T13:25:00Z'
          }
        ]
      },
      {
        _id: 'menu2_2',
        menuName: '角色管理',
        menuType: 3,
        menuState: 1,
        path: '/system/role',
        component: 'RoleManagement',
        menuCode: 'system:role',
        createTime: '2023-02-15T14:30:00Z',
        buttons: [
          {
            _id: 'menu2_2_1',
            menuName: '新增角色',
            menuType: 2,
            menuState: 1,
            menuCode: 'role:add',
            createTime: '2023-02-20T15:00:00Z'
          },
          {
            _id: 'menu2_2_2',
            menuName: '编辑角色',
            menuType: 2,
            menuState: 1,
            menuCode: 'role:edit',
            createTime: '2023-02-20T15:05:00Z'
          }
        ]
      },
      {
        _id: 'menu2_3',
        menuName: '部门管理',
        menuType: 3,
        menuState: 1,
        path: '/system/dept',
        component: 'DeptManagement',
        menuCode: 'system:dept',
        createTime: '2023-02-25T16:00:00Z'
      }
    ]
  },
  {
    _id: 'menu3',
    menuName: '订单管理',
    icon: 'ShoppingCartOutlined',
    menuType: 1,
    menuState: 1,
    path: '/order',
    component: 'OrderManagement',
    menuCode: 'order:view',
    createTime: '2023-03-01T09:30:00Z',
    children: [
      {
        _id: 'menu3_1',
        menuName: '订单列表',
        menuType: 3,
        menuState: 1,
        path: '/order/list',
        component: 'OrderList',
        menuCode: 'order:list',
        createTime: '2023-03-05T10:00:00Z',
        buttons: [
          {
            _id: 'menu3_1_1',
            menuName: '查看详情',
            menuType: 2,
            menuState: 1,
            menuCode: 'order:detail',
            createTime: '2023-03-10T11:00:00Z'
          },
          {
            _id: 'menu3_1_2',
            menuName: '取消订单',
            menuType: 2,
            menuState: 1,
            menuCode: 'order:cancel',
            createTime: '2023-03-10T11:05:00Z'
          }
        ]
      },
      {
        _id: 'menu3_2',
        menuName: '订单聚合',
        menuType: 3,
        menuState: 1,
        path: '/order/cluster',
        component: 'OrderCluster',
        menuCode: 'order:cluster',
        createTime: '2023-03-15T12:00:00Z'
      }
    ]
  },
  {
    _id: 'menu4',
    menuName: '司机管理',
    icon: 'CarOutlined',
    menuType: 3,
    menuState: 1,
    path: '/driver',
    component: 'DriverManagement',
    menuCode: 'driver:view',
    createTime: '2023-03-20T13:00:00Z'
  },
  {
    _id: 'menu5',
    menuName: '财务管理',
    icon: 'DollarOutlined',
    menuType: 1,
    menuState: 1,
    path: '/finance',
    component: 'FinanceManagement',
    menuCode: 'finance:view',
    createTime: '2023-04-01T08:15:00Z',
    children: [
      {
        _id: 'menu5_1',
        menuName: '收入统计',
        menuType: 3,
        menuState: 1,
        path: '/finance/income',
        component: 'IncomeStatistics',
        menuCode: 'finance:income',
        createTime: '2023-04-05T09:00:00Z'
      },
      {
        _id: 'menu5_2',
        menuName: '支出管理',
        menuType: 3,
        menuState: 1,
        path: '/finance/expense',
        component: 'ExpenseManagement',
        menuCode: 'finance:expense',
        createTime: '2023-04-10T10:00:00Z'
      }
    ]
  },
  {
    _id: 'menu6',
    menuName: '报表中心',
    icon: 'FileTextOutlined',
    menuType: 1,
    menuState: 1,
    path: '/report',
    component: 'ReportCenter',
    menuCode: 'report:view',
    createTime: '2023-04-15T11:30:00Z',
    children: [
      {
        _id: 'menu6_1',
        menuName: '销售报表',
        menuType: 3,
        menuState: 1,
        path: '/report/sales',
        component: 'SalesReport',
        menuCode: 'report:sales',
        createTime: '2023-04-20T12:00:00Z'
      },
      {
        _id: 'menu6_2',
        menuName: '运营报表',
        menuType: 3,
        menuState: 1,
        path: '/report/operation',
        component: 'OperationReport',
        menuCode: 'report:operation',
        createTime: '2023-04-25T13:00:00Z'
      }
    ]
  },
  {
    _id: 'menu7',
    menuName: '个人中心',
    icon: 'UserOutlined',
    menuType: 3,
    menuState: 1,
    path: '/profile',
    component: 'ProfilePage',
    menuCode: 'profile:view',
    createTime: '2023-05-01T09:45:00Z'
  },
  {
    _id: 'menu8',
    menuName: '消息通知',
    icon: 'BellOutlined',
    menuType: 3,
    menuState: 1,
    path: '/notification',
    component: 'NotificationPage',
    menuCode: 'notification:view',
    createTime: '2023-05-10T12:00:00Z'
  },
  {
    _id: 'menu9',
    menuName: '客户管理',
    icon: 'TeamOutlined',
    menuType: 1,
    menuState: 1,
    path: '/customer',
    component: 'CustomerManagement',
    menuCode: 'customer:view',
    createTime: '2023-06-01T10:15:00Z',
    children: [
      {
        _id: 'menu9_1',
        menuName: '客户列表',
        menuType: 3,
        menuState: 1,
        path: '/customer/list',
        component: 'CustomerList',
        menuCode: 'customer:list',
        createTime: '2023-06-05T13:30:00Z',
        buttons: [
          {
            _id: 'menu9_1_1',
            menuName: '新增客户',
            menuType: 2,
            menuState: 1,
            menuCode: 'customer:add',
            createTime: '2023-06-10T15:00:00Z'
          },
          {
            _id: 'menu9_1_2',
            menuName: '编辑客户',
            menuType: 2,
            menuState: 1,
            menuCode: 'customer:edit',
            createTime: '2023-06-10T15:05:00Z'
          }
        ]
      }
    ]
  },
  {
    _id: 'menu10',
    menuName: '数据分析',
    icon: 'LineChartOutlined',
    menuType: 3,
    menuState: 1,
    path: '/analytics',
    component: 'Analytics',
    menuCode: 'analytics:view',
    createTime: '2023-06-15T08:30:00Z'
  },
  {
    _id: 'menu11',
    menuName: '库存管理',
    icon: 'DatabaseOutlined',
    menuType: 1,
    menuState: 1,
    path: '/inventory',
    component: 'InventoryManagement',
    menuCode: 'inventory:view',
    createTime: '2023-07-01T09:00:00Z',
    children: [
      {
        _id: 'menu11_1',
        menuName: '库存查询',
        menuType: 3,
        menuState: 1,
        path: '/inventory/query',
        component: 'InventoryQuery',
        menuCode: 'inventory:query',
        createTime: '2023-07-05T10:00:00Z'
      }
    ]
  },
  {
    _id: 'menu12',
    menuName: '客服中心',
    icon: 'CustomerServiceOutlined',
    menuType: 3,
    menuState: 1,
    path: '/service',
    component: 'ServiceCenter',
    menuCode: 'service:view',
    createTime: '2023-07-10T11:45:00Z'
  },
  {
    _id: 'menu13',
    menuName: '发票管理',
    icon: 'FileTextOutlined',
    menuType: 1,
    menuState: 1,
    path: '/invoice',
    component: 'InvoiceManagement',
    menuCode: 'invoice:view',
    createTime: '2023-08-01T10:30:00Z',
    children: [
      {
        _id: 'menu13_1',
        menuName: '发票列表',
        menuType: 3,
        menuState: 1,
        path: '/invoice/list',
        component: 'InvoiceList',
        menuCode: 'invoice:list',
        createTime: '2023-08-05T13:15:00Z',
        buttons: [
          {
            _id: 'menu13_1_1',
            menuName: '开具发票',
            menuType: 2,
            menuState: 1,
            menuCode: 'invoice:create',
            createTime: '2023-08-10T14:00:00Z'
          }
        ]
      }
    ]
  },
  {
    _id: 'menu14',
    menuName: '意见反馈',
    icon: 'CommentOutlined',
    menuType: 3,
    menuState: 1,
    path: '/feedback',
    component: 'FeedbackPage',
    menuCode: 'feedback:view',
    createTime: '2023-08-10T09:00:00Z'
  },
  {
    _id: 'menu15',
    menuName: '系统配置',
    icon: 'ControlOutlined',
    menuType: 1,
    menuState: 1,
    path: '/config',
    component: 'SystemConfig',
    menuCode: 'config:view',
    createTime: '2023-09-01T08:45:00Z',
    children: [
      {
        _id: 'menu15_1',
        menuName: '基础配置',
        menuType: 3,
        menuState: 1,
        path: '/config/basic',
        component: 'BasicConfig',
        menuCode: 'config:basic',
        createTime: '2023-09-05T09:00:00Z'
      },
      {
        _id: 'menu15_2',
        menuName: '高级配置',
        menuType: 3,
        menuState: 1,
        path: '/config/advanced',
        component: 'AdvancedConfig',
        menuCode: 'config:advanced',
        createTime: '2023-09-10T10:00:00Z'
      }
    ]
  },
  {
    _id: 'menu16',
    menuName: '日志管理',
    icon: 'FileSearchOutlined',
    menuType: 3,
    menuState: 1,
    path: '/log',
    component: 'LogManagement',
    menuCode: 'log:view',
    createTime: '2023-09-15T11:00:00Z'
  },
  {
    _id: 'menu17',
    menuName: '权限管理',
    icon: 'SafetyOutlined',
    menuType: 1,
    menuState: 1,
    path: '/permission',
    component: 'PermissionManagement',
    menuCode: 'permission:view',
    createTime: '2023-10-01T12:00:00Z',
    children: [
      {
        _id: 'menu17_1',
        menuName: '权限分配',
        menuType: 3,
        menuState: 1,
        path: '/permission/assign',
        component: 'PermissionAssign',
        menuCode: 'permission:assign',
        createTime: '2023-10-05T13:00:00Z'
      }
    ]
  },
  {
    _id: 'menu18',
    menuName: '数据备份',
    icon: 'CloudUploadOutlined',
    menuType: 3,
    menuState: 1,
    path: '/backup',
    component: 'DataBackup',
    menuCode: 'backup:view',
    createTime: '2023-10-10T14:00:00Z'
  },
  {
    _id: 'menu19',
    menuName: '系统监控',
    icon: 'MonitorOutlined',
    menuType: 1,
    menuState: 1,
    path: '/monitor',
    component: 'SystemMonitor',
    menuCode: 'monitor:view',
    createTime: '2023-11-01T15:00:00Z',
    children: [
      {
        _id: 'menu19_1',
        menuName: '性能监控',
        menuType: 3,
        menuState: 1,
        path: '/monitor/performance',
        component: 'PerformanceMonitor',
        menuCode: 'monitor:performance',
        createTime: '2023-11-05T16:00:00Z'
      },
      {
        _id: 'menu19_2',
        menuName: '错误日志',
        menuType: 3,
        menuState: 1,
        path: '/monitor/error',
        component: 'ErrorLog',
        menuCode: 'monitor:error',
        createTime: '2023-11-10T17:00:00Z'
      }
    ]
  },
  {
    _id: 'menu20',
    menuName: '帮助文档',
    icon: 'QuestionCircleOutlined',
    menuType: 3,
    menuState: 1,
    path: '/help',
    component: 'HelpDocument',
    menuCode: 'help:view',
    createTime: '2023-12-01T18:00:00Z'
  }
]
