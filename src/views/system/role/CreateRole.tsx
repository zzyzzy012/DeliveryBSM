import { Modal, Form, Input } from 'antd'
import { useState, useImperativeHandle } from 'react'
import type { IModalProp, IAction } from '@/types/modal'
import type { Role } from '@/types/api'
import api from '@/api/roleApi'
import { message } from '@/utils/AntDGlobal'

const CreateRole = (props: IModalProp<Role.RoleItem>) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  // 打开弹窗
  const open = async (type: IAction, data?: Role.RoleItem) => {
    setVisible(true)
    setAction(type)
    if (data) {
      form.setFieldsValue(data)
    }
  }
  // 暴露方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 表单提交
  const onsubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = await form.getFieldsValue()
      if (action === 'edit') {
        await api.editRole(params)
      } else {
        await api.createRole(params)
      }
      message.success('操作成功')
      oncancel()
      props.update()
    }
  }
  // 取消
  const oncancel = () => {
    setVisible(false)
    form.resetFields()
  }
  return (
    <Modal
      title={action === 'create' ? '新增角色' : '编辑角色'}
      okText='确认'
      cancelText='取消'
      centered
      width={700}
      open={visible}
      onOk={onsubmit}
      onCancel={oncancel}
    >
      <Form form={form} layout='vertical' style={{ width: 600 }}>
        <Form.Item label='角色ID' key='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='角色名称' name='name' rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item label='备注' key='remark'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateRole
