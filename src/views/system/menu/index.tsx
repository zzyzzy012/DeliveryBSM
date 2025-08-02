import { Form, Input, Space, Button, Table, Modal, Select } from 'antd'
import type { TableProps } from 'antd'
import type { Menu } from '@/types/api'
import { useState, useEffect, useRef } from 'react'
import api from '@/api'
import { formatDate } from '@/utils'
import { message } from '@/utils/AntDGlobal'
import CreateMenu from './CreateMenu'
import { fakeData } from './fakeData'
import type { IAction } from '@/types/modal'
// import { useLoaderData } from 'react-router-dom'
// import type { IAuthLoader } from '@/router/AuthLoader'

const Menu = () => {
  // const data = useLoaderData('layout') as IAuthLoader
  const [form] = Form.useForm()
  const [menuData, setMenuData] = useState<Menu.MenuItem[]>()
  const menuRef = useRef<
    | {
        open: (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => void
      }
    | undefined
  >(undefined)
  // 获取数据
  const getMenuList = async () => {
    const res = await api.getMenuList(form.getFieldsValue())
    setMenuData(res)
  }
  useEffect(() => {
    getMenuList()
  }, [])
  // 新增
  const onAdd = () => {
    menuRef.current?.open('create')
  }
  const onSubAdd = (record: Menu.MenuItem) => {
    menuRef.current?.open('create', { parentId: record._id, orderBy: record.children?.length || 1 })
  }
  // 编辑
  const onEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', record)
  }
  // 删除
  const onDel = (record: Menu.MenuItem) => {
    let title = ''
    if (record.menuType === 1) title = '菜单'
    if (record.menuType === 2) title = '按钮'
    if (record.menuType === 1) title = '页面'

    Modal.confirm({
      title: `删除${title}`,
      content: `确认删除该${title}吗？`,
      cancelText: '取消',
      okText: '确认',
      onOk() {
        onDelSubmit(record._id)
      }
    })
  }
  const onDelSubmit = async (_id: string) => {
    await api.deleteDept({
      _id
    })
    message.success('删除成功')
    getMenuList()
  }

  // 搜索
  const onSearch = () => {
    getMenuList()
  }
  // 重置
  const onReset = () => {
    form.resetFields()
  }

  const columns: TableProps<Menu.MenuItem>['columns'] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width: 200
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 150
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          i: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => onSubAdd(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => onEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => onDel(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='deptList'>
      <Form layout='inline' form={form}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select
            options={[
              { label: '正常', value: 1 },
              { label: '禁用', value: 2 }
            ]}
            style={{ width: 120 }}
          />
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
          <div className='title'>菜单列表</div>
          <Button type='primary' onClick={onAdd}>
            新增
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{ type: 'checkbox' }}
        rowKey='_id'
        columns={columns}
        dataSource={menuData?.length ? menuData : fakeData}
        pagination={false}
      />
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}

export default Menu
