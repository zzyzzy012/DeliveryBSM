import type { IAction, IModalProp } from '@/types/modal'
import type { Dept, User } from '@/types/api'
import { Modal, Form, TreeSelect, Input, Select } from 'antd'
import { useImperativeHandle, useState, useEffect } from 'react'
import { fakeData } from './fakeData'
import api from '@/api'
import { message } from '@/utils/AntDGlobal'

const CreateDept = (props: IModalProp<Dept.EditParams>) => {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>()
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>()
  const [userList, setUserList] = useState<User.UserItem[]>([])
  const defaultUserList = [
    { value: '1', label: '张三' },
    { value: '2', label: '李四' },
    { value: '3', label: '王五' }
  ]

  // 获取接口参数
  const getDeptList = async () => {
    const res = await api.getDeptList()
    setDeptList(res)
  }

  const getUserList = async () => {
    const res = await api.getAllUserList()
    setUserList(res)
  }

  useEffect(() => {
    // getDeptList()
    getUserList()
  }, [])

  // 定义open方法
  const open = (type: IAction, data?: Dept.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getDeptList()
    if (data) {
      form.setFieldsValue(data)
    } else {
      form.resetFields()
    }
  }

  // 暴露open方法给父组件
  useImperativeHandle(
    props.mRef,
    () => ({
      open
    }),
    []
  )

  // 部门提交
  const onsubmit = async () => {
    try {
      const valid = await form.validateFields()
      if (valid) {
        if (action === 'create') {
          await api.createDept(form.getFieldsValue())
        } else {
          await api.eidtDept(form.getFieldsValue())
        }
        message.success('操作成功')
        onCancel()
        props.update?.()
      }
    } catch (error) {
      console.error('操作失败:', error)
    }
  }

  const onCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '新增部门' : '编辑部门'}
      open={visible}
      okText='确认'
      cancelText='取消'
      onOk={onsubmit}
      onCancel={onCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item label='部门ID' name='deptId' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList?.length ? deptList : fakeData}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请输入负责人' }]}>
          <Select placeholder='请选择负责人' allowClear options={userList || defaultUserList} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateDept
