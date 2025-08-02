import type { Role } from '@/types/api'
export const fakeData: Role.RoleItem[] = [
  {
    _id: 'role1',
    roleName: '超级管理员',
    remark: '拥有系统所有功能的完全访问权限',
    permissionList: {
      checkedKeys: [
        'menu1',
        'menu1_1',
        'menu1_2',
        'menu2',
        'menu2_1',
        'menu2_1_1',
        'menu2_1_2',
        'menu2_1_3',
        'menu2_2',
        'menu2_2_1',
        'menu2_2_2',
        'menu2_3',
        'menu3',
        'menu3_1',
        'menu3_1_1',
        'menu3_1_2',
        'menu3_2',
        'menu4',
        'menu5',
        'menu5_1',
        'menu5_2',
        'menu6',
        'menu6_1',
        'menu6_2',
        'menu7',
        'menu8',
        'menu9',
        'menu9_1',
        'menu9_1_1',
        'menu9_1_2',
        'menu10',
        'menu11',
        'menu11_1',
        'menu12',
        'menu13',
        'menu13_1',
        'menu13_1_1',
        'menu14',
        'menu15',
        'menu15_1',
        'menu15_2',
        'menu16',
        'menu17',
        'menu17_1',
        'menu18',
        'menu19',
        'menu19_1',
        'menu19_2',
        'menu20'
      ],
      halfCheckedKeys: [
        'menu1',
        'menu2',
        'menu3',
        'menu5',
        'menu6',
        'menu9',
        'menu11',
        'menu13',
        'menu15',
        'menu17',
        'menu19'
      ]
    },
    updateTime: '2023-01-15T10:30:00Z',
    createTime: '2023-01-10T09:00:00Z'
  },
  {
    _id: 'role2',
    roleName: '系统管理员',
    remark: '负责系统管理和用户管理，无财务权限',
    permissionList: {
      checkedKeys: [
        'menu1',
        'menu1_1',
        'menu1_2',
        'menu2',
        'menu2_1',
        'menu2_1_1',
        'menu2_1_2',
        'menu2_1_3',
        'menu2_2',
        'menu2_2_1',
        'menu2_2_2',
        'menu2_3',
        'menu3',
        'menu3_1',
        'menu3_1_1',
        'menu3_1_2',
        'menu3_2',
        'menu4',
        'menu7',
        'menu8',
        'menu9',
        'menu9_1',
        'menu9_1_1',
        'menu9_1_2',
        'menu10',
        'menu11',
        'menu11_1',
        'menu12',
        'menu14',
        'menu15',
        'menu15_1',
        'menu15_2',
        'menu16',
        'menu17',
        'menu17_1',
        'menu18',
        'menu19',
        'menu19_1',
        'menu19_2',
        'menu20'
      ],
      halfCheckedKeys: ['menu1', 'menu2', 'menu3', 'menu9', 'menu11', 'menu15', 'menu17', 'menu19']
    },
    updateTime: '2023-02-05T12:45:00Z',
    createTime: '2023-02-01T08:45:00Z'
  },
  {
    _id: 'role3',
    roleName: '用户管理员',
    remark: '专门负责用户、角色、部门的管理',
    permissionList: {
      checkedKeys: [
        'menu2',
        'menu2_1',
        'menu2_1_1',
        'menu2_1_2',
        'menu2_1_3',
        'menu2_2',
        'menu2_2_1',
        'menu2_2_2',
        'menu2_3'
      ],
      halfCheckedKeys: ['menu2']
    },
    updateTime: '2023-03-10T14:00:00Z',
    createTime: '2023-03-01T09:30:00Z'
  },
  {
    _id: 'role4',
    roleName: '订单管理员',
    remark: '负责订单管理和司机管理',
    permissionList: {
      checkedKeys: ['menu3', 'menu3_1', 'menu3_1_1', 'menu3_1_2', 'menu3_2', 'menu4'],
      halfCheckedKeys: ['menu3']
    },
    updateTime: '2023-04-20T11:20:00Z',
    createTime: '2023-04-01T10:15:00Z'
  },
  {
    _id: 'role5',
    roleName: '数据分析师',
    remark: '负责数据分析和报表查看',
    permissionList: {
      checkedKeys: ['menu1', 'menu1_1', 'menu1_2', 'menu6', 'menu6_1', 'menu6_2', 'menu10'],
      halfCheckedKeys: ['menu1', 'menu6']
    },
    updateTime: '2023-05-05T13:30:00Z',
    createTime: '2023-05-01T08:00:00Z'
  },
  {
    _id: 'role6',
    roleName: '客服专员',
    remark: '负责客户服务和意见反馈处理',
    permissionList: {
      checkedKeys: ['menu12', 'menu14'],
      halfCheckedKeys: []
    },
    updateTime: '2023-06-15T09:45:00Z',
    createTime: '2023-06-01T11:00:00Z'
  },
  {
    _id: 'role7',
    roleName: '财务管理员',
    remark: '负责财务管理和发票管理',
    permissionList: {
      checkedKeys: ['menu5', 'menu5_1', 'menu5_2', 'menu13', 'menu13_1', 'menu13_1_1'],
      halfCheckedKeys: ['menu5', 'menu13']
    },
    updateTime: '2023-07-10T12:15:00Z',
    createTime: '2023-07-01T10:30:00Z'
  },
  {
    _id: 'role8',
    roleName: '客户经理',
    remark: '负责客户管理和客户关系维护',
    permissionList: {
      checkedKeys: ['menu9', 'menu9_1', 'menu9_1_1', 'menu9_1_2'],
      halfCheckedKeys: ['menu9']
    },
    updateTime: '2023-08-05T14:00:00Z',
    createTime: '2023-08-01T09:15:00Z'
  },
  {
    _id: 'role9',
    roleName: '库存管理员',
    remark: '负责库存管理和库存查询',
    permissionList: {
      checkedKeys: ['menu11', 'menu11_1'],
      halfCheckedKeys: ['menu11']
    },
    updateTime: '2023-09-01T11:30:00Z',
    createTime: '2023-08-15T08:45:00Z'
  },
  {
    _id: 'role10',
    roleName: '系统配置员',
    remark: '负责系统配置和权限管理',
    permissionList: {
      checkedKeys: ['menu15', 'menu15_1', 'menu15_2', 'menu17', 'menu17_1'],
      halfCheckedKeys: ['menu15', 'menu17']
    },
    updateTime: '2023-10-10T13:00:00Z',
    createTime: '2023-10-01T09:00:00Z'
  },
  {
    _id: 'role11',
    roleName: '个人中心管理员',
    remark: '负责个人中心功能管理',
    permissionList: {
      checkedKeys: ['menu7', 'menu8'],
      halfCheckedKeys: []
    },
    updateTime: '2023-11-05T10:45:00Z',
    createTime: '2023-11-01T08:30:00Z'
  },
  {
    _id: 'role12',
    roleName: '日志管理员',
    remark: '负责系统日志管理和数据备份',
    permissionList: {
      checkedKeys: ['menu16', 'menu18'],
      halfCheckedKeys: []
    },
    updateTime: '2023-12-01T12:00:00Z',
    createTime: '2023-11-15T09:15:00Z'
  },
  {
    _id: 'role13',
    roleName: '系统监控员',
    remark: '负责系统监控和性能分析',
    permissionList: {
      checkedKeys: ['menu19', 'menu19_1', 'menu19_2'],
      halfCheckedKeys: ['menu19']
    },
    updateTime: '2024-01-10T14:30:00Z',
    createTime: '2024-01-01T10:00:00Z'
  },
  {
    _id: 'role14',
    roleName: '普通用户',
    remark: '基础功能访问权限，无管理功能',
    permissionList: {
      checkedKeys: ['menu1', 'menu1_1', 'menu7', 'menu8', 'menu20'],
      halfCheckedKeys: ['menu1']
    },
    updateTime: '2024-02-05T11:20:00Z',
    createTime: '2024-02-01T09:45:00Z'
  },
  {
    _id: 'role15',
    roleName: '访客用户',
    remark: '仅可查看基础信息，无操作权限',
    permissionList: {
      checkedKeys: ['menu1', 'menu20'],
      halfCheckedKeys: ['menu1']
    },
    updateTime: '2024-03-01T13:15:00Z',
    createTime: '2024-02-15T08:30:00Z'
  }
]
