import { Modal, Form, Input, Select, DatePicker, Row, Col, InputNumber } from 'antd'
import { useState, useEffect, useImperativeHandle } from 'react'
import type { IModalProp, IAction } from '@/types/modal'
import type { Order } from '@/types/api'
import api from '@/api/orderApi'
import { message } from '@/utils/AntDGlobal'
import { mockCityList, mockVehicleList } from '../fakeData'

const CreateOrder = (props: IModalProp<Order.OrderItem>) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [cityList, setCityList] = useState<Order.DictItem[]>(mockCityList)
  const [vehicleList, setVehicleList] = useState<Order.DictItem[]>(mockVehicleList)
  const [action, setAction] = useState<IAction>('create')
  const [editData, setEditData] = useState<Order.OrderItem>()

  const open = (type?: IAction, data?: Order.OrderItem) => {
    setVisible(true)
    setAction(type || 'create')
    setEditData(data)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
    }
  }
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  const getInitData = async () => {
    const cities = await api.getCityList()
    setCityList(cities)
    const vehicles = await api.getVehicleList()
    setVehicleList(vehicles)
  }
  useEffect(() => {
    getInitData() // 获取初始数据
  }, [])
  // 提交
  const onOk = async () => {
    const validate = await form.validateFields()
    if (validate) {
      if (action === 'create') {
        await api.createOrder(form.getFieldsValue())
        message.success('创建订单成功')
      } else if (action === 'edit' && editData) {
        await api.updateOrderInfo({ ...form.getFieldsValue(), _id: editData._id })
        message.success('编辑订单成功')
      }
      onCancel()
      props.update()
    }
  }
  // 取消
  const onCancel = () => {
    setVisible(false)
    form.resetFields()
    setAction('create')
    setEditData(undefined)
  }
  return (
    <Modal
      title={action === 'create' ? '创建订单' : '编辑订单'}
      okText='确定'
      cancelText='取消'
      width='55rem'
      centered
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        style={{ width: '50rem' }}
        form={form}
        layout='horizontal'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign='right'
      >
        <Row>
          <Col span={12}>
            <Form.Item label='城市名称' name='cityName' rules={[{ required: true, message: '请输入城市名称' }]}>
              <Select
                placeholder='请选择城市名称'
                options={cityList.map(item => {
                  return { label: item.name, value: item.id }
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='车型' name='vehicleType' rules={[{ required: true, message: '请选择车型' }]}>
              <Select
                placeholder='请选择车型'
                options={vehicleList.map(item => {
                  return { label: item.name, value: item.id }
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
              <Input placeholder='请输入用户名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='手机号'
              name='mobile'
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[0-9]\d{9}$/, message: '请输入11位手机号' }
              ]}
            >
              <Input placeholder='请输入下单手机号' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='起始地址' name='startAddress' rules={[{ required: true, message: '请输入起始地址' }]}>
              <Input placeholder='请输入起始地址' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='结束地址' name='endAddress' rules={[{ required: true, message: '请输入结束地址' }]}>
              <Input placeholder='请输入结束地址' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='下单金额' name='orderAmount' rules={[{ required: true, message: '请输入下单金额' }]}>
              <InputNumber placeholder='请输入下单金额' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='支付金额' name='userPayAmount' rules={[{ required: true, message: '请输入支付金额' }]}>
              <InputNumber placeholder='请输入支付金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='司机名称' name='driverName' rules={[{ required: true, message: '请输入司机名称' }]}>
              <Input placeholder='请输入司机名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='司机金额' name='driverAmount' rules={[{ required: true, message: '请输入司机金额' }]}>
              <InputNumber placeholder='请输入司机金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='支付方法' name='payType' rules={[{ required: true, message: '请选择支付方法' }]}>
              <Select
                placeholder='请选择支付方法'
                options={[
                  { label: '微信', value: 1 },
                  { label: '支付宝', value: 2 }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='订单状态' name='state'>
              <Select
                placeholder='请选择订单状态'
                options={[
                  { label: '进行中', value: 1 },
                  { label: '已完成', value: 2 },
                  { label: '超时', value: 3 },
                  { label: '取消', value: 4 }
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='用车时间' name='useTime'>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='结束时间' name='endTime'>
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default CreateOrder
