export  const lineoption = {
  // title: {
  //   text: '订单和流水走势图'
  // },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['订单', '流水']
  },
  grid: {
    left: 50,
    right: 50,
    bottom: 20
  },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '订单',
      type: 'line',
      data: [60, 71, 59, 45, 62, 34, 70, 67, 88, 40, 91, 87]
    },
    {
      name: '流水',
      type: 'line',
      data: [7102, 9490, 8799, 6554, 7324, 5400, 8124, 7483, 1362, 5908, 1498, 1378]
    }
  ]
}

export const pieoption1 = {
  title: {
    text: '司机城市分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '城市分布',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 848, name: '北京' },
        { value: 1435, name: '上海' },
        { value: 780, name: '广州' },
        { value: 894, name: '深圳' },
        { value: 699, name: '杭州' },
        { value: 710, name: '南京' },
        { value: 756, name: '苏州' },
      ]
    }
  ]
}
    
    
export const pieoption2 = {
  title: {
    text: '司机年龄分布',
    left: 'center'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '年龄分布',
      type: 'pie',
      radius: [50, 180],
      roseType: 'area',
      data: [
        { value: 848, name: '北京' },
        { value: 1435, name: '上海' },
        { value: 780, name: '广州' },
        { value: 894, name: '深圳' },
        { value: 699, name: '杭州' },
        { value: 710, name: '南京' },
        { value: 756, name: '苏州' },
      ]
    }
  ]
}


export const radaroption = {
  // title: {
  //   text: '司机模型诊断',
  //   left: 'center'
  // },
  legend: {
    data: ['司机模型诊断']
  },
  tooltip: {
    trigger: 'item'
  },
  radar: {
    indicator: [
      { name: '服务态度', max: 100 },
      { name: '在线时长', max: 100 },
      { name: '接单率', max: 100 },
      {name: '评分', max: 100 },
      { name: '关注度', max: 100 }
    ]
  },
  series: [
    {
      name: '模型诊断',
      type: 'radar',
      data: [
        {
          value: [85, 64, 90, 90, 50],
          name: '工作维度统计'
        }
      ]
    }
  ]
}
