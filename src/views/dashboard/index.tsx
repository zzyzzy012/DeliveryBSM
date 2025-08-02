import styles from './index.module.less'
import { Descriptions, Card, Button } from 'antd'
import type { DescriptionsProps } from 'antd'
// import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import useStore from '@/store'
import { formatUserState, formatNumber, formatMoney } from '@/utils'
import api from '@/api'
import type { Dashboard } from '@/types/api'
import { useCharts } from '@/hook/useCharts'
import { lineoption, pieoption1, pieoption2, radaroption } from './chartOption'

function Dashboard() {
  const userInfo = useStore(state => state.userInfo)
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: userInfo.userId || '00011111'
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo.userEmail || '未设置邮箱'
    },
    {
      key: '3',
      label: '状态',
      children: formatUserState(userInfo.state) || '未设置状态'
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo.mobile || '未设置手机号'
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo.job || '未设置岗位'
    },
    {
      key: '6',
      label: '部门',
      children: userInfo.deptName || '未设置部门'
    }
  ]
  // 获取reportData
  const [reportData, setReportData] = useState<Dashboard.ReportData>()
  const getReportData = async () => {
    const res = await api.getReportData()
    setReportData(res)
  }
  useEffect(() => {
    getReportData()
  }, [])
  // 获取图
  const [lineRef, lineChart] = useCharts()
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  const [radarRef, radarChart] = useCharts()
  useEffect(() => {
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
    lineChart?.setOption(lineoption)
    pieChart1?.setOption(pieoption1)
    pieChart2?.setOption(pieoption2)
    radarChart?.setOption(radaroption)
  }, [lineChart, pieChart1, pieChart2, radarChart])

  // 加载折线图
  const renderLineChart = async () => {
    if (!lineChart) return
    const res = await api.getLineData()
    lineChart?.setOption({
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
        data: res.label
          ? res.label
          : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: res.order ? res.order : [60, 71, 59, 45, 62, 34, 70, 67, 88, 40, 91, 87]
        },
        {
          name: '流水',
          type: 'line',
          data: res.money ? res.money : [7102, 9490, 8799, 6554, 7324, 5400, 8124, 7483, 1362, 5908, 1498, 1378]
        }
      ]
    })
  }

  // 加载饼图
  const renderPieChart1 = async () => {
    if (pieChart1) return
    const res = await api.getPieCityData()
    pieChart1!.setOption({
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
          data: res
            ? res
            : [
                { value: 848, name: '北京' },
                { value: 1435, name: '上海' },
                { value: 780, name: '广州' },
                { value: 894, name: '深圳' },
                { value: 699, name: '杭州' },
                { value: 710, name: '南京' },
                { value: 756, name: '苏州' }
              ]
        }
      ]
    })
  }
  const renderPieChart2 = async () => {
    if (!pieChart2) return
    const res = await api.getPieAgeData()
    pieChart2?.setOption({
      title: {
        text: '司机年龄分布',
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
          name: '年龄分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          data: res
            ? res
            : [
                { value: 848, name: '北京' },
                { value: 1435, name: '上海' },
                { value: 780, name: '广州' },
                { value: 894, name: '深圳' },
                { value: 699, name: '杭州' },
                { value: 710, name: '南京' },
                { value: 756, name: '苏州' }
              ]
        }
      ]
    })
  }

  // 加载雷达图
  const renderRadarChart = async () => {
    if (!radarChart) return
    const res = await api.getRadarData()
    radarChart?.setOption({
      // title: {
      //   text: '司机模型诊断',
      //   left: 'center'
      // },
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: res.indicator || [
          { name: '服务态度', max: 100 },
          { name: '在线时长', max: 24 },
          { name: '接单率', max: 100 },
          { name: '评分', max: 100 },
          { name: '关注度', max: 100 }
        ]
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: res.data || [85, 8, 90, 90, 50]
        }
      ]
    })
  }

  // 刷新图表
  const renderPieRefresh = () => {
    renderPieChart1()
    renderPieChart2()
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={userInfo.userImg ? userInfo.userImg : '/imgs/avatar.jpg'} alt='avatar' />
        <Descriptions title='欢迎尊贵的用户' items={items} />
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className={styles.title}>司机数量</div>
          <div className={styles.data}>{formatNumber(reportData?.driverCount || 1210)}个</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总流水</div>
          <div className={styles.data}>{formatMoney(reportData?.totalMoney || 3103476523946)}元</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总订单</div>
          <div className={styles.data}>{formatNumber(reportData?.orderCount || 2000)}单</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>开通城市</div>
          <div className={styles.data}>{reportData?.cityNum || 35}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={() => renderLineChart()}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={() => renderPieRefresh()}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieWrapper}>
            <div ref={pieRef1} className={styles.itemChart}></div>
            <div ref={pieRef2} className={styles.itemChart}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={() => renderRadarChart()}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
