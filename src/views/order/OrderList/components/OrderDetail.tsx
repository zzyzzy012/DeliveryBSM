import { Modal, Descriptions } from 'antd'
import { useState, useImperativeHandle } from 'react'
import type { DescriptionsProps } from 'antd'
import type { Order } from '@/types/api'
import type { IDetailProp } from '@/types/modal'
// import api from '@/api/orderApi'
import { formateMobile, formatMoney, formatDate } from '@/utils'
import { mockOrderData } from '../fakeData'
// import OrderMarker from './OrderMarker'

const OrderDetail = (props: IDetailProp) => {
  const [visible, setVisible] = useState(false)
  const [detailData, setDetailData] = useState<Order.OrderItem | undefined>(undefined)
  // 打开弹窗
  const open = async (orderId: string) => {
    setVisible(true)
    // const res = await api.getOrderDetail(orderId)
    // setDetailData(res)
    // 使用假数据模拟API调用
    const foundData = mockOrderData.find(item => item._id === orderId)
    setDetailData(foundData)
  }
  // 暴露方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  const formatOrderState = (state: number | undefined) => {
    if (!state) return '-'
    const stateMap = {
      1: '进行中',
      2: '已完成',
      3: '超时',
      4: '取消'
    }
    return stateMap[state as keyof typeof stateMap] || '-'
  }
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '订单编号',
      children: detailData?._id
    },
    {
      key: '2',
      label: '下单城市',
      children: detailData?.cityName
    },
    {
      key: '3',
      label: '下单用户',
      children: detailData?.userName
    },
    {
      key: '4',
      label: '手机号',
      children: detailData?.mobile ? formateMobile(detailData.mobile) : '-'
    },
    {
      key: '5',
      label: '起点',
      children: detailData?.startAddress
    },
    {
      key: '6',
      label: '终点',
      children: detailData?.endAddress
    },
    {
      key: '7',
      label: '订单金额',
      children: detailData?.orderAmount ? formatMoney(detailData.orderAmount) : '-'
    },
    {
      key: '8',
      label: '用户支付金额',
      children: detailData?.userPayAmount ? formatMoney(detailData.userPayAmount) : '-'
    },
    {
      key: '9',
      label: '司机到账金额',
      children: detailData?.driverAmount ? formatMoney(detailData.driverAmount) : '-'
    },
    {
      key: '10',
      label: '支付方式',
      children: detailData?.payType === 1 ? '微信支付' : '支付宝支付'
    },
    {
      key: '11',
      label: '司机名称',
      children: detailData?.driverName
    },
    {
      key: '12',
      label: '订单车型',
      children: detailData?.vehicleName
    },
    {
      key: '13',
      label: '订单状态',
      children: formatOrderState(detailData?.state)
    },
    {
      key: '14',
      label: '用车时间',
      children: formatDate(detailData?.useTime)
    },
    {
      key: '15',
      label: '订单结束时间',
      children: formatDate(detailData?.endTime)
    },
    {
      key: '16',
      label: '订单创建时间',
      children: formatDate(detailData?.createTime)
    }
  ]
  return (
    <Modal title='订单详情' footer={false} open={visible} width={800} closable onCancel={() => setVisible(false)}>
      <Descriptions column={2} style={{ padding: '1rem 1.5rem' }} items={items} />
    </Modal>
  )
}

export default OrderDetail
