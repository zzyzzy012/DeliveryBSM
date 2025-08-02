import { Form, Input, Select, Space, Button, Table } from 'antd'
import { useState, useEffect } from 'react'
import type { TableProps } from 'antd'
import type { Order } from '@/types/api'
import { formatDate, formatMoney } from '@/utils'
import api from '@/api/orderApi'
import { fakeData } from './fakeData'

const DriverList = () => {
  const [form] = Form.useForm()
  const [driverList, setDriverList] = useState<Order.DriverItem[]>([])
  const getDriverList = async () => {
    const res = await api.getDrvierList(form.getFieldsValue())
    setDriverList(res.list)
  }
  useEffect(() => {
    getDriverList()
  }, [])

  // 搜索
  const onSearch = () => {
    getDriverList()
  }
  // 重置
  const onReset = () => {
    form.resetFields()
    getDriverList()
  }
  const selectOptions = [
    { label: '待认证', value: '0' },
    { label: '正常', value: '1' },
    { label: '暂时拉黑', value: '2' },
    { label: '永久拉黑', value: '3' },
    { label: '停止推送', value: '4' }
  ]

  const columns: TableProps<Order.DriverItem>['columns'] = [
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName',
      fixed: 'left',
      width: 100
    },
    {
      title: '司机信息',
      dataIndex: 'driverInfo',
      key: 'driverInfo',
      width: 200,
      render(_, record) {
        return (
          <div>
            <p>
              <span>司机ID：</span>
              <span>{record.driverId}</span>
            </p>
            <p>
              <span>司机手机号：</span>
              <span>{record.driverPhone}</span>
            </p>
            <p>
              <span>注册城市：</span>
              <span>{record.cityName}</span>
            </p>
            <p>
              <span>会员等级：</span>
              <span>{record.grade}</span>
            </p>
            <p>
              <span>司机等级：</span>
              <span>{record.driverLevel}</span>
            </p>
          </div>
        )
      }
    },
    {
      title: '司机状态',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      width: 100,
      render(_, record) {
        const statusMap = {
          0: '待认证',
          1: '正常',
          2: '暂时拉黑',
          3: '永久拉黑',
          4: '停止推送'
        }
        return statusMap[record.accountStatus as keyof typeof statusMap]
      }
    },
    {
      title: '车辆信息',
      dataIndex: 'vehicleInfo',
      key: 'vehicleInfo',
      width: 260,
      render(_, record) {
        return (
          <div>
            <p>
              <span>车牌号：</span>
              <span>{record.carNo}</span>
            </p>
            <p>
              <span>车辆品牌：</span>
              <span>{record.vehicleBrand}</span>
            </p>
            <p>
              <span>车牌名称：</span>
              <span>{record.vehicleName}</span>
            </p>
          </div>
        )
      }
    },
    {
      title: '昨日在线时长',
      dataIndex: 'onlineTime',
      key: 'onlineTime',
      width: 100
    },
    {
      title: '昨日司机流水',
      dataIndex: 'driverAmount',
      key: 'driverAmount',
      width: 120,
      render(driverAmount: number) {
        return formatMoney(driverAmount)
      }
    },
    {
      title: '司机评分',
      dataIndex: 'rating',
      key: 'rating',
      width: 100
    },
    {
      title: '行为分',
      dataIndex: 'driverScore',
      key: 'driverScore',
      width: 100
    },
    {
      title: '昨日推单数',
      dataIndex: 'pushOrderCount',
      key: 'pushOrderCount',
      width: 120
    },
    {
      title: '昨日完单数',
      dataIndex: 'orderCompleteCount',
      key: 'orderCompleteCount',
      width: 120
    },
    {
      title: '加入时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 220,
      render(createTime: string) {
        return formatDate(createTime)
      }
    }
  ]
  return (
    <div className='driverList'>
      <Form form={form} layout='inline'>
        <Form.Item label='司机姓名' name='driverName'>
          <Input placeholder='请输入司机姓名' />
        </Form.Item>
        <Form.Item label='司机状态' name='driverStatus' style={{ width: '13rem' }}>
          <Select placeholder='请选择司机状态' options={selectOptions} defaultValue={'0'} />
        </Form.Item>
        <Form.Item name='action'>
          <Space>
            <Button type='primary' onClick={onSearch}>
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseList'>
        <div className='headerWrapper'>
          <div className='title'>司机列表</div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={driverList.length ? driverList : fakeData}
        pagination={false}
        scroll={{ x: 1800 }}
      ></Table>
    </div>
  )
}

export default DriverList
