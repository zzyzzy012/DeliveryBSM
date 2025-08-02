import { Modal } from 'antd'
import type { IDetailProp } from '@/types/modal'
import { useState, useImperativeHandle, useEffect, useRef } from 'react'
// import api from '@/api/orderApi'
// import type { Order } from '@/types/api'

const OrderRoute = (props: IDetailProp) => {
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const mapRef = useRef<any>(null)
  const trackAniRef = useRef<any>(null)
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  const open = (orderId: string) => {
    // const res = await api.getOrderDetail(orderId)
    setVisible(true)
    setOrderId(orderId)
    // initMap(res)
  }
  // 路径数据
  const path = [
    {
      lng: 116.297611,
      lat: 40.047363
    },
    {
      lng: 116.302839,
      lat: 40.048219
    },
    {
      lng: 116.308301,
      lat: 40.050566
    },
    {
      lng: 116.305732,
      lat: 40.054957
    },
    {
      lng: 116.304754,
      lat: 40.057953
    },
    {
      lng: 116.306487,
      lat: 40.058312
    },
    {
      lng: 116.307223,
      lat: 40.056379
    }
  ]

  // 初始化地图
  // 这里传入参数
  // detail: Order.OrderItem
  const initMap = () => {
    setTimeout(() => {
      const container = document.getElementById('routeMap')
      if (container) {
        // 创建地图实例
        const map = new BMapGL.Map('routeMap')
        mapRef.current = map

        // 设置地图中心点和缩放级别
        map.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 17)
        map.enableScrollWheelZoom() // 开启鼠标滚轮缩放

        // 创建路径点
        const points = []
        for (let i = 0; i < path.length; i++) {
          points.push(new BMapGL.Point(path[i].lng, path[i].lat))
        }

        // 创建折线
        const polyline = new BMapGL.Polyline(points, {
          strokeColor: '#f9723d',
          strokeWeight: 4,
          strokeOpacity: 0.8
        })
        map.addOverlay(polyline)

        // 添加起点和终点标记
        const startMarker = new BMapGL.Marker(points[0])
        const endMarker = new BMapGL.Marker(points[points.length - 1])
        map.addOverlay(startMarker)
        map.addOverlay(endMarker)

        // 如果有轨迹动画库，启动动画
        if (window.BMapGLLib && window.BMapGLLib.TrackAnimation) {
          startTrackAnimation(map, polyline)
        } else {
          console.warn('轨迹动画库未加载，请检查 BMapGLLib 是否正确引入')
        }
      }
    }, 100)
  }

  // 启动轨迹动画
  const startTrackAnimation = (map: any, polyline: any) => {
    try {
      const trackAni = new window.BMapGLLib.TrackAnimation(map, polyline, {
        overallView: true,
        tilt: 30,
        duration: 20000,
        delay: 300
      })
      trackAniRef.current = trackAni
      trackAni.start()
    } catch (error) {
      console.error('启动轨迹动画失败:', error)
    }
  }

  // 当 Modal 打开时初始化地图
  useEffect(() => {
    if (visible) {
      initMap()
    }
  }, [visible])

  // 清理函数
  const cleanup = () => {
    try {
      // 停止轨迹动画
      if (trackAniRef.current) {
        trackAniRef.current.stop()
        trackAniRef.current = null
      }

      // 清理地图实例
      if (mapRef.current) {
        mapRef.current.clearOverlays()
        mapRef.current.destroy()
        mapRef.current = null
      }

      // 清理 DOM 容器
      const container = document.getElementById('routeMap')
      if (container) {
        container.innerHTML = ''
      }
    } catch (error) {
      console.error('清理地图失败:', error)
    }
  }

  // 关闭弹窗
  const handleClose = () => {
    cleanup()
    setVisible(false)
    setOrderId('')
  }

  return (
    <Modal
      title='订单轨迹'
      open={visible}
      footer={false}
      closable
      width={'50rem'}
      onCancel={handleClose}
      afterClose={cleanup}
    >
      <div id='routeMap' style={{ height: '35rem' }}></div>
    </Modal>
  )
}

export default OrderRoute
