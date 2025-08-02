import Cluster from '@bmapgl-plugin/cluster'
import { useEffect } from 'react'
import { points } from './poits'

const OrderCluster = () => {
  const renderMap = () => {
    const map = new BMapGL.Map('container') // 创建地图实例
    const point = new BMapGL.Point(116.404, 39.915) // 创建点坐标
    const cluster = new Cluster.View(map)
    cluster.setData(points)
    // 三种模式BMAP_NORMAL_MAP || BMAP_EARTH_MAP || BMAP_SATELLITE_MAP
    map.setMapType(BMAP_NORMAL_MAP) // 设置地图类型为地球模式
    // 自定义地图样式
    map.setMapStyleV2({
      styleId: '834453df5e46c1816f6a1656be6cbdc6'
    })
    map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom() //开启鼠标滚轮缩放
    const scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
    map.addControl(scaleCtrl)
    const zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
    map.addControl(zoomCtrl)
    // anchor 和 offset 设置控件位置
    const cityCtrl = new BMapGL.CityListControl({ anchor: BMAP_ANCHOR_TOP_RIGHT }) // 添加城市列表控件
    map.addControl(cityCtrl)
  }
  // cluster.on(Cluster.ClusterEvent.CLICK, (e: Cluster.ClusterElement) => {
  //   console.log('ClusterEvent.CLICK', e)
  // })
  // cluster.on(Cluster.ClusterEvent.MOUSE_OUT, (e: Cluster.ClusterElement) => {
  //   console.log('ClusterEvent.MOUSE_OUT', e)
  // })
  // cluster.on(Cluster.ClusterEvent.MOUSE_OVER, (e: Cluster.ClusterElement) => {
  //   console.log('ClusterEvent.MOUSE_OVER', e)
  // })
  // cluster.on(Cluster.ClusterEvent.CHANGE, (e: [any, any]) => {
  //   console.log('ClusterEvent.CHANGE', e)
  // })
  useEffect(() => {
    renderMap()
  }, [])
  return <div className='orderCluster' id='container' style={{ height: '40rem' }}></div>
}

export default OrderCluster
