import { Button, Form, Input, Space, Table, Modal, message } from 'antd'
import type { TableProps } from 'antd'
import type { Role, PageParams } from '@/types/api'
import type { IAction } from '@/types/modal'
import { formatDate } from '@/utils'
import api from '@/api/roleApi'
import { useState, useEffect, useRef } from 'react'
import CreateRole from './CreateRole'
import { fakeData } from './fakeData'

function RoleList() {
  const [form] = Form.useForm()
  // 获取数据
  const [roleData, setRoleData] = useState<Role.RoleItem[]>()
  // 分页相关
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  const getRoleList = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const res = await api.getRoleList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    setRoleData(res.list)
    setTotal(res.page.total)
    setPagination({
      current: res.page.pageNum,
      pageSize: res.page.pageSize || pagination.pageSize
    })
  }
  useEffect(() => {
    getRoleList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  // 获取弹窗ref
  const roleRef = useRef<{ open: (type: IAction, data?: Role.RoleItem) => void } | undefined>(undefined)
  // 新增
  const handleAdd = () => {
    roleRef.current?.open('create')
  }

  // 编辑
  const handleEdit = (record: Role.RoleItem) => {
    roleRef.current?.open('edit', record)
  }

  // 删除
  const handleDelete = (_id: string) => {
    // 需要二次确认
    Modal.confirm({
      title: '确认删除该角色吗',
      content: '请二次确认是否删除角色',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        delRole(_id)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  // 公共删除接口
  const delRole = async (_id: string) => {
    try {
      await api.delRole({ _id })
      message.success('删除角色成功')
      getRoleList({
        pageNum: 1
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 更新
  const updateRoleList = () => {
    getRoleList({
      pageNum: pagination.current
    })
  }

  // 搜索
  const onSearch = () => {
    getRoleList({
      pageNum: 1
    })
  }
  // 重置
  const onReset = () => {
    form.resetFields()
  }

  const columns: TableProps<Role.RoleItem>['columns'] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render(record: Role.RoleItem) {
        return (
          <Space>
            <Button type='link' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='link' onClick={() => handleEdit(record)}>
              设置权限
            </Button>
            <Button type='link' danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='userList'>
      <Form layout='inline' form={form}>
        <Form.Item label='角色名称' name='roleName'>
          <Input placeholder='请输入角色名称' />
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
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleAdd}>
              新增
            </Button>
          </div>
        </div>
        <Table
          rowSelection={{
            type: 'checkbox'
          }}
          rowKey='_id'
          columns={columns}
          dataSource={roleData?.length ? roleData : fakeData}
          pagination={{
            position: ['bottomRight'],
            total,
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
      <CreateRole mRef={roleRef} update={updateRoleList} />
    </div>
  )
}

export default RoleList
