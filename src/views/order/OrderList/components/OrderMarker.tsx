import { message, Modal } from 'antd'
import { useState, useImperativeHandle, useEffect } from 'react'
import type { IDetailProp } from '@/types/modal'
import type { Order } from '@/types/api'
// import api from '@/api/orderApi'

const OrderMarker = (props: IDetailProp) => {
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [orderData, setOrderData] = useState<Order.OrderItem | null>(null)
  const [markers, setMarkers] = useState<{ lng: number | string; lat: number | string; id: number }[]>([])

  const open = async (orderId: string) => {
    setVisible(true)
    setOrderId(orderId)
    renderMap()
    // const res = await orderApi.getOrderDetail(orderId)
    // setOrderData(res)
  }

  // 渲染地图
  // res: Order.OrderItem
  const renderMap = () => {
    // 使用 setTimeout 确保 DOM 元素完全渲染
    setTimeout(() => {
      const container = document.getElementById('markerMap')
      if (container) {
        const map = new BMapGL.Map('markerMap')
        const point = new BMapGL.Point(116.404, 39.915)
        map.centerAndZoom(point, 12)
        const scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
        map.addControl(scaleCtrl)
        const zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
        map.addControl(zoomCtrl)
        // orderData?.route?.map(item => {
        //   createMarker(map, item.lng, item.lat)
        // })
        // 给地图添加点击事件，而不是给marker
        map.addEventListener('click', function (e: any) {
          createMarker(map, e.latlng.lng, e.latlng.lat)
        })
      }
    }, 100)
  }

  // 创建marker
  const createMarker = (map: any, lng: number, lat: number) => {
    // const id = Math.random()
    const marker = new BMapGL.Marker(new BMapGL.Point(lng, lat))
    map.addOverlay(marker) // 只添加一次
    // markers.push({ lng, lat, id })
    // marker.id = id
    // 创建右键菜单
    const markerMenu = new BMapGL.ContextMenu()
    markerMenu.addItem(
      new BMapGL.MenuItem('删除', function () {
        map.removeOverlay(marker)
        // const index = markers.findIndex(item => item.id === marker.id)
        // markers.splice(index, 1)
        // setMarkers([...markers])
      })
    )
    marker.setContextMenu(markerMenu)
  }

  // 当 Modal 打开且订单数据准备好时渲染地图
  useEffect(() => {
    if (visible && orderData) {
      renderMap()
    }
  }, [visible, orderData])

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const onOK = async () => {
    // await api.updateOrderInfo({ orderId, route: markers })
    message.success('打点成功')
    onCancel()
  }

  const onCancel = () => {
    setVisible(false)
    setMarkers([])
  }

  return (
    <Modal
      title='地图打点'
      open={visible}
      okText='确定'
      cancelText='取消'
      width={1000}
      onOk={onOK}
      onCancel={onCancel}
      closable
    >
      <div id='markerMap' style={{ height: '35rem' }}></div>
    </Modal>
  )
}

export default OrderMarker
