import { Button, Form, Input, Select, Space, Table, Modal, message } from 'antd'
import type { TableProps } from 'antd'
import type { Order, PageParams } from '@/types/api'
import type { IAction } from '@/types/modal'
import { formatDate, formatMoney } from '@/utils'
import orderApi from '@/api/orderApi'
import { useState, useEffect, useRef } from 'react'
import CreateOrder from './components/CreateOrder'
import { mockOrderData } from './fakeData'
import OrderDetail from './components/OrderDetail'
import OrderMarker from './components/OrderMarker'
import OrderRoute from './components/OrderRoute'

function OrderList() {
  const [form] = Form.useForm()
  // 获取订单列表
  const [orderData, setOrderData] = useState<Order.OrderItem[]>([])
  // 分页相关
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  const getOrderList = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const res = await orderApi.getOrderList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    setOrderData(res.list)
    setTotal(res.page.total)
    setPagination({
      current: res.page.pageNum,
      pageSize: res.page.pageSize || pagination.pageSize
    })
  }
  useEffect(() => {
    getOrderList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  // 搜索
  const onSearch = () => {
    getOrderList({
      pageNum: 1
    })
  }
  // 重置
  const onReset = () => {
    form.resetFields()
  }

  // 获取弹窗ref
  const orderRef = useRef<{ open: (type: IAction, data?: Order.OrderItem) => void } | undefined>(undefined)
  const orderDetailRef = useRef<{ open: (orderId: string) => void } | undefined>(undefined)
  const orderMarkerRef = useRef<{ open: (orderId: string) => void } | undefined>(undefined)
  const orderRouteRef = useRef<{ open: (orderId: string) => void } | undefined>(undefined)

  // 新增
  const handleAdd = () => {
    orderRef.current?.open('create')
  }
  // 导出
  const handleExport = () => {
    const values = form.getFieldsValue()
    orderApi.exportData(values)
  }

  // 详情
  const onDetail = (orderId: string) => {
    orderDetailRef.current?.open(orderId)
  }
  // 打点
  const onMarker = (orderId: string) => {
    orderMarkerRef.current?.open(orderId)
  }
  // 轨迹
  const onRoute = (orderId: string) => {
    orderRouteRef.current?.open(orderId)
  }
  // 删除
  const handleDelete = (orderId: string) => {
    // 二次确认
    Modal.confirm({
      title: '确认删除该订单吗',
      content: '请二次确认是否删除订单',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        delOrder(orderId)
      }
      // onCancel() {
      //   console.log('Cancel')
      // }
    })
  }

  // 公共删除接口
  const delOrder = async (orderId: string) => {
    try {
      await orderApi.delOrder(orderId)
      message.success('删除订单成功')
      getOrderList({
        pageNum: 1
      })
    } catch (error) {
      console.log(error)
    }
  }

  const columns: TableProps<Order.OrderItem>['columns'] = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render(orderAmount: number) {
        return formatMoney(orderAmount)
      }
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '进行中',
          2: '已完成',
          3: '超时',
          4: '取消'
        }[state]
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='link' onClick={() => onDetail(record._id)}>
              详情
            </Button>
            <Button type='link' onClick={() => onMarker(record._id)}>
              打点
            </Button>
            <Button type='link' onClick={() => onRoute(record._id)}>
              轨迹
            </Button>
            <Button type='link' danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const selectOptions = [
    { value: 1, label: '进行中' },
    { value: 2, label: '已完成' },
    { value: 3, label: '超时' },
    { value: 4, label: '取消' }
  ]

  return (
    <div className='orderList'>
      <Form layout='inline' form={form}>
        <Form.Item label='订单ID' name='orderId'>
          <Input placeholder='请输入订单ID' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='订单状态' name='state'>
          <Select defaultValue={1} style={{ width: '8rem' }} options={selectOptions} />
        </Form.Item>
        <Form.Item name='action'>
          <Space>
            <Button type='primary' onClick={onSearch}>
              搜索
            </Button>
            <Button danger onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseList'>
        <div className='headerWrapper'>
          <div className='title'>订单列表</div>
          <div className='action'>
            <Space>
              <Button type='primary' onClick={handleAdd}>
                新增
              </Button>
              <Button onClick={handleExport}>导出</Button>
            </Space>
          </div>
        </div>
        <Table
          rowSelection={{
            type: 'checkbox'
          }}
          rowKey='_id'
          columns={columns}
          dataSource={orderData.length > 0 ? orderData : mockOrderData}
          pagination={{
            position: ['bottomRight'],
            total,
            showQuickJumper: true,
            showTotal: function (total) {
              return `共 ${total} 条数据`
            },
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize
              })
            }
          }}
        />
      </div>
      <CreateOrder
        mRef={orderRef}
        update={() =>
          getOrderList({
            pageNum: pagination.current
          })
        }
      />
      {/* 订单详情 */}
      <OrderDetail mRef={orderDetailRef} />
      {/* 地图打点 */}
      <OrderMarker mRef={orderMarkerRef} />
      {/* 订单轨迹 */}
      <OrderRoute mRef={orderRouteRef} />
    </div>
  )
}

export default OrderList
