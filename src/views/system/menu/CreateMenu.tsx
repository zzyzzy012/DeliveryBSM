import type { IAction, IModalProp } from '@/types/modal'
import type { Menu } from '@/types/api'
import { Modal, Form, TreeSelect, Input, Radio, InputNumber } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useImperativeHandle, useState, useEffect } from 'react'
import api from '@/api'
import { message } from '@/utils/AntDGlobal'

const CreateMenu = (props: IModalProp<Menu.EditParams>) => {
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>()
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>()

  // 获取接口参数
  const getMenuList = async () => {
    const res = await api.getMenuList()
    setMenuList(res)
  }

  useEffect(() => {
    // getDeptList()
  }, [])

  // 定义open方法
  const open = (type: IAction, data?: Menu.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getMenuList()
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
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      open={visible}
      okText='确认'
      cancelText='取消'
      onOk={onsubmit}
      onCancel={onCancel}
      style={{ width: 600 }}
    >
      <Form
        form={form}
        labelAlign='right'
        labelCol={{ span: 4 }}
        initialValues={{ menuType: 1, orderBy: 1, menuState: 1 }}
      >
        <Form.Item label='菜单ID' name='menuId' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='上级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择上级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: '_id' }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group
            options={[
              { value: 1, label: '菜单' },
              { value: 2, label: '按钮' },
              { value: 3, label: '页面' }
            ]}
          />
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        {/* 根据不同类型，显示不同的表单项 */}
        <Form.Item shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item label='权限标识' name='menuCode'>
                <Input placeholder='请输入权限标识' />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <Input placeholder='请输入菜单图标' />
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>
        <Form.Item
          label='排序'
          name='orderBy'
          tooltip={{ icon: <InfoCircleOutlined />, title: '排序值越大越靠后' }}
          rules={[{ min: 1, max: 10, message: '排序值必须在1-10之间' }]}
        >
          <InputNumber placeholder='请输入排序值' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group
            options={[
              { value: 1, label: '启用' },
              { value: 2, label: '停用' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu
