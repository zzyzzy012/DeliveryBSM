import type { Dept } from '@/types/api'
export const fakeData: Dept.DeptItem[] = [
  {
    _id: 'dept1',
    createTime: '2023-01-10T09:00:00Z',
    updateTime: '2023-01-15T14:30:00Z',
    deptName: '技术研发部',
    parentId: '',
    userName: '张技术',
    children: [
      {
        _id: 'dept1_1',
        createTime: '2023-02-01T10:15:00Z',
        updateTime: '2023-02-05T16:20:00Z',
        deptName: '前端开发组',
        parentId: 'dept1',
        userName: '李前端',
        children: []
      },
      {
        _id: 'dept1_2',
        createTime: '2023-02-10T11:30:00Z',
        updateTime: '2023-02-15T12:45:00Z',
        deptName: '后端开发组',
        parentId: 'dept1',
        userName: '王后端',
        children: []
      },
      {
        _id: 'dept1_3',
        createTime: '2023-02-20T09:00:00Z',
        updateTime: '2023-02-25T14:30:00Z',
        deptName: '测试组',
        parentId: 'dept1',
        userName: '赵测试',
        children: []
      }
    ]
  },
  {
    _id: 'dept2',
    createTime: '2023-03-01T08:45:00Z',
    updateTime: '2023-03-05T13:10:00Z',
    deptName: '产品运营部',
    parentId: '',
    userName: '陈产品',
    children: [
      {
        _id: 'dept2_1',
        createTime: '2023-03-10T10:00:00Z',
        updateTime: '2023-03-15T15:20:00Z',
        deptName: '产品设计组',
        parentId: 'dept2',
        userName: '刘设计',
        children: []
      },
      {
        _id: 'dept2_2',
        createTime: '2023-03-20T11:30:00Z',
        updateTime: '2023-03-25T16:45:00Z',
        deptName: '运营推广组',
        parentId: 'dept2',
        userName: '孙运营',
        children: []
      }
    ]
  },
  {
    _id: 'dept3',
    createTime: '2023-04-05T09:20:00Z',
    updateTime: '2023-04-10T15:25:00Z',
    deptName: '市场销售部',
    parentId: '',
    userName: '周市场',
    children: [
      {
        _id: 'dept3_1',
        createTime: '2023-04-15T10:00:00Z',
        updateTime: '2023-04-20T14:40:00Z',
        deptName: '销售一组',
        parentId: 'dept3',
        userName: '吴销售',
        children: []
      },
      {
        _id: 'dept3_2',
        createTime: '2023-04-25T11:15:00Z',
        updateTime: '2023-04-30T15:50:00Z',
        deptName: '销售二组',
        parentId: 'dept3',
        userName: '郑销售',
        children: []
      }
    ]
  },
  {
    _id: 'dept4',
    createTime: '2023-05-01T11:15:00Z',
    updateTime: '2023-05-05T16:50:00Z',
    deptName: '人力资源部',
    parentId: '',
    userName: '冯人事',
    children: []
  },
  {
    _id: 'dept5',
    createTime: '2023-06-10T08:30:00Z',
    updateTime: '2023-06-15T12:00:00Z',
    deptName: '财务部',
    parentId: '',
    userName: '朱财务',
    children: [
      {
        _id: 'dept5_1',
        createTime: '2023-06-20T09:45:00Z',
        updateTime: '2023-06-25T13:20:00Z',
        deptName: '会计核算组',
        parentId: 'dept5',
        userName: '何会计',
        children: []
      },
      {
        _id: 'dept5_2',
        createTime: '2023-06-30T10:30:00Z',
        updateTime: '2023-07-05T14:15:00Z',
        deptName: '资金管理组',
        parentId: 'dept5',
        userName: '吕资金',
        children: []
      }
    ]
  },
  {
    _id: 'dept6',
    createTime: '2023-07-01T10:00:00Z',
    updateTime: '2023-07-05T14:15:00Z',
    deptName: '客户服务部',
    parentId: '',
    userName: '施客服',
    children: []
  },
  {
    _id: 'dept7',
    createTime: '2023-08-10T09:30:00Z',
    updateTime: '2023-08-15T11:45:00Z',
    deptName: '行政后勤部',
    parentId: '',
    userName: '孔行政',
    children: [
      {
        _id: 'dept7_1',
        createTime: '2023-08-20T10:15:00Z',
        updateTime: '2023-08-25T14:50:00Z',
        deptName: '后勤保障组',
        parentId: 'dept7',
        userName: '严后勤',
        children: []
      }
    ]
  },
  {
    _id: 'dept8',
    createTime: '2023-09-01T08:00:00Z',
    updateTime: '2023-09-05T12:30:00Z',
    deptName: '质量管理部',
    parentId: '',
    userName: '华质量',
    children: []
  },
  {
    _id: 'dept9',
    createTime: '2023-10-01T11:00:00Z',
    updateTime: '2023-10-05T15:20:00Z',
    deptName: '法务合规部',
    parentId: '',
    userName: '金法务',
    children: []
  },
  {
    _id: 'dept10',
    createTime: '2023-11-01T09:45:00Z',
    updateTime: '2023-11-05T13:10:00Z',
    deptName: '战略发展部',
    parentId: '',
    userName: '魏战略',
    children: [
      {
        _id: 'dept10_1',
        createTime: '2023-11-10T10:30:00Z',
        updateTime: '2023-11-15T15:45:00Z',
        deptName: '投资并购组',
        parentId: 'dept10',
        userName: '蒋投资',
        children: []
      },
      {
        _id: 'dept10_2',
        createTime: '2023-11-20T11:00:00Z',
        updateTime: '2023-11-25T16:20:00Z',
        deptName: '战略规划组',
        parentId: 'dept10',
        userName: '沈规划',
        children: []
      }
    ]
  }
]
