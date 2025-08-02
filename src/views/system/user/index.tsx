import { Button, Form, Input, Select, Space, Table, Modal, message } from 'antd'
import type { TableProps } from 'antd'
import type { User, PageParams } from '@/types/api'
import type { IAction } from '@/types/modal'
import { formatDate } from '@/utils'
import { fakeData } from './fakeData'
import api from '@/api'
import { useState, useEffect, useRef } from 'react'
import CreateUser from './CreateUser'

function UserList() {
  const [form] = Form.useForm()
  // 获取用户列表
  const [userData, setUserData] = useState<User.UserItem[]>()
  // 分页相关
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  // 批量删除相关，需要获取userIds
  const [userIds, setUserIds] = useState<number[]>([])

  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const res = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    // Array.from({ length: 50 }).fill({}).map((item: any) => {
    //   item = { ...res.list }
    //   item.userId = Math.random()
    //   return item
    // })
    setUserData(res.list)
    setTotal(res.page.total)
    setPagination({
      current: res.page.pageNum,
      pageSize: res.page.pageSize || pagination.pageSize
    })
  }
  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  // 获取弹窗ref
  const userRef = useRef<{ open: (type: IAction, data?: User.UserItem) => void } | undefined>(undefined)
  // 新增
  const handleAdd = () => {
    userRef.current?.open('create')
  }

  // 编辑
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }

  // 删除
  const handleDelete = (userId: number) => {
    // 需要二次确认
    Modal.confirm({
      title: '确认删除该用户吗',
      content: '请二次确认是否删除用户',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        delUser([userId])
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  // 批量删除
  const delPatchUser = () => {
    // 需要二次确认
    Modal.confirm({
      title: '确认删除该批用户吗',
      content: '请二次确认是否删除该批用户',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        delUser([...userIds])
      }
    })
  }
  // 公共删除接口
  const delUser = async (userIds: number[]) => {
    try {
      await api.delUser({ userIds })
      message.success('删除用户成功')
      getUserList({
        pageNum: 1
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 更新
  const updateUserList = () => {
    getUserList({
      pageNum: pagination.current
    })
  }

  // 搜索
  const onSearch = () => {
    getUserList({
      pageNum: 1
    })
  }
  // 重置
  const onReset = () => {
    form.resetFields()
  }

  const columns: TableProps<User.UserItem>['columns'] = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type='link' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='link' danger onClick={() => handleDelete(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const selectOptions = [
    { value: 0, label: '所有' },
    { value: 1, label: '在职' },
    { value: 2, label: '离职' },
    { value: 3, label: '试用期' }
  ]

  return (
    <div className='userList'>
      <Form layout='inline' form={form}>
        <Form.Item label='用户ID' name='userId'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select defaultValue={0} style={{ width: '8rem' }} options={selectOptions} />
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
          <div className='title'>用户列表</div>
          <div className='action'>
            <Space>
              <Button type='primary' onClick={handleAdd}>
                新增
              </Button>
              <Button danger onClick={delPatchUser}>
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        {/* current: pagination.current,
            pageSize: pagination.pageSize, */}
        <Table<User.UserItem>
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          rowKey='userId'
          columns={columns}
          dataSource={userData?.length ? userData : fakeData}
          pagination={{
            position: ['bottomRight'],
            pageSizeOptions: ['5', '10', '15'],
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
      <CreateUser mRef={userRef} update={updateUserList} />
    </div>
  )
}

export default UserList
