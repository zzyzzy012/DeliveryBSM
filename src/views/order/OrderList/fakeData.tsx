import { Order } from '@/types/api'

export const mockOrderData: Order.OrderItem[] = [
  {
    _id: 'order_001',
    orderId: 'DD20241201001',
    cityName: '北京市',
    userName: '张三',
    mobile: 13800138001,
    startAddress: '北京市朝阳区三里屯太古里',
    endAddress: '北京市海淀区中关村软件园',
    orderAmount: 128.5,
    userPayAmount: 128.5,
    driverAmount: 115.65,
    payType: 1,
    driverName: '李师傅',
    vehicleName: '大众帕萨特',
    state: 1,
    useTime: '2024-12-01 14:30:00',
    endTime: '2024-12-01 15:45:00',
    route: [
      { lng: '116.4551', lat: '39.9419' },
      { lng: '116.4552', lat: '39.9420' },
      { lng: '116.4553', lat: '39.9421' }
    ],
    createTime: '2024-12-01 14:25:00',
    remark: '乘客要求车内保持安静'
  },
  {
    _id: 'order_002',
    orderId: 'DD20241201002',
    cityName: '上海市',
    userName: '李四',
    mobile: 13800138002,
    startAddress: '上海市浦东新区陆家嘴金融中心',
    endAddress: '上海市黄浦区外滩',
    orderAmount: 89.0,
    userPayAmount: 89.0,
    driverAmount: 80.1,
    payType: 2,
    driverName: '王师傅',
    vehicleName: '丰田凯美瑞',
    state: 2,
    useTime: '2024-12-01 16:00:00',
    endTime: '2024-12-01 16:35:00',
    route: [
      { lng: '121.4737', lat: '31.2304' },
      { lng: '121.4738', lat: '31.2305' },
      { lng: '121.4739', lat: '31.2306' }
    ],
    createTime: '2024-12-01 15:55:00',
    remark: '乘客有急事，请尽快到达'
  },
  {
    _id: 'order_003',
    orderId: 'DD20241201003',
    cityName: '广州市',
    userName: '王五',
    mobile: 13800138003,
    startAddress: '广州市天河区珠江新城',
    endAddress: '广州市越秀区北京路步行街',
    orderAmount: 156.8,
    userPayAmount: 156.8,
    driverAmount: 141.12,
    payType: 1,
    driverName: '陈师傅',
    vehicleName: '本田雅阁',
    state: 3,
    useTime: '2024-12-01 18:30:00',
    endTime: '2024-12-01 19:45:00',
    route: [
      { lng: '113.2644', lat: '23.1291' },
      { lng: '113.2645', lat: '23.1292' },
      { lng: '113.2646', lat: '23.1293' }
    ],
    createTime: '2024-12-01 18:25:00',
    remark: '订单超时，司机未按时到达'
  },
  {
    _id: 'order_004',
    orderId: 'DD20241201004',
    cityName: '深圳市',
    userName: '赵六',
    mobile: 13800138004,
    startAddress: '深圳市南山区科技园',
    endAddress: '深圳市福田区华强北',
    orderAmount: 95.5,
    userPayAmount: 95.5,
    driverAmount: 85.95,
    payType: 2,
    driverName: '刘师傅',
    vehicleName: '日产天籁',
    state: 4,
    useTime: '2024-12-01 20:00:00',
    endTime: '2024-12-01 20:30:00',
    route: [
      { lng: '114.0579', lat: '22.5431' },
      { lng: '114.0580', lat: '22.5432' },
      { lng: '114.0581', lat: '22.5433' }
    ],
    createTime: '2024-12-01 19:55:00',
    remark: '乘客临时取消订单'
  },
  {
    _id: 'order_005',
    orderId: 'DD20241201005',
    cityName: '杭州市',
    userName: '孙七',
    mobile: 13800138005,
    startAddress: '杭州市西湖区西湖文化广场',
    endAddress: '杭州市滨江区阿里巴巴总部',
    orderAmount: 112.0,
    userPayAmount: 112.0,
    driverAmount: 100.8,
    payType: 1,
    driverName: '周师傅',
    vehicleName: '别克君威',
    state: 2,
    useTime: '2024-12-01 21:15:00',
    endTime: '2024-12-01 21:50:00',
    route: [
      { lng: '120.1551', lat: '30.2741' },
      { lng: '120.1552', lat: '30.2742' },
      { lng: '120.1553', lat: '30.2743' }
    ],
    createTime: '2024-12-01 21:10:00',
    remark: '乘客对服务很满意'
  }
]

// 城市列表假数据
export const mockCityList: Order.DictItem[] = [
  { id: 'beijing', name: '北京市' },
  { id: 'shanghai', name: '上海市' },
  { id: 'guangzhou', name: '广州市' },
  { id: 'shenzhen', name: '深圳市' },
  { id: 'hangzhou', name: '杭州市' },
  { id: 'nanjing', name: '南京市' },
  { id: 'wuhan', name: '武汉市' },
  { id: 'chengdu', name: '成都市' },
  { id: 'xian', name: '西安市' },
  { id: 'tianjin', name: '天津市' },
  { id: 'chongqing', name: '重庆市' },
  { id: 'suzhou', name: '苏州市' },
  { id: 'dalian', name: '大连市' },
  { id: 'qingdao', name: '青岛市' },
  { id: 'xiamen', name: '厦门市' }
]

// 车辆类型假数据
export const mockVehicleList: Order.DictItem[] = [
  { id: 'economy', name: '经济型' },
  { id: 'comfort', name: '舒适型' },
  { id: 'business', name: '商务型' },
  { id: 'luxury', name: '豪华型' },
  { id: 'suv', name: 'SUV' },
  { id: 'mpv', name: 'MPV' },
  { id: 'sports', name: '跑车' },
  { id: 'electric', name: '新能源车' },
  { id: 'hybrid', name: '混合动力' },
  { id: 'compact', name: '紧凑型' },
  { id: 'sedan', name: '轿车' },
  { id: 'hatchback', name: '掀背车' },
  { id: 'wagon', name: '旅行车' },
  { id: 'convertible', name: '敞篷车' },
  { id: 'pickup', name: '皮卡' }
]
