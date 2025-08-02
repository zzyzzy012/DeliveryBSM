import { Form, Input, Space, Button, Table, Modal } from 'antd'
import type { TableProps } from 'antd'
import type { Dept } from '@/types/api'
import { useState, useEffect, useRef } from 'react'
import api from '@/api'
import { fakeData } from './fakeData'
import { formatDate } from '@/utils'
import CreateDept from './CreateDept'
import { message } from '@/utils/AntDGlobal'
import type { IAction } from '@/types/modal'

const Dept = () => {
  const [form] = Form.useForm()
  const [deptData, setDeptData] = useState<Dept.DeptItem[]>()
  const deptRef = useRef<
    | {
        open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
      }
    | undefined
  >(undefined)
  const getDeptList = async () => {
    const res = await api.getDeptList(form.getFieldsValue())
    setDeptData(res)
  }
  useEffect(() => {
    getDeptList()
  }, [])
  // 新增
  const onAdd = () => {
    deptRef.current?.open('create')
  }
  const onSubAdd = (_id: string) => {
    deptRef.current?.open('create', { parentId: _id })
  }
  // 编辑
  const onEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }
  // 删除
  const onDel = (_id: string) => {
    Modal.confirm({
      title: '删除部门',
      content: '确认删除该部门吗？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        onDelSubmit(_id)
      }
    })
  }
  const onDelSubmit = async (_id: string) => {
    await api.deleteDept({
      _id
    })
    message.success('删除成功')
    getDeptList()
  }
  // 搜索
  const onSearch = () => {
    getDeptList()
  }
  // 重置
  const onReset = () => {
    form.resetFields()
  }
  const columns: TableProps<Dept.DeptItem>['columns'] = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return formatDate(updateTime)
      }
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
            <Button type='text' onClick={() => onSubAdd(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => onEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => onDel(record._id)}>
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
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
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
          <div className='title'>部门列表</div>
          <Button type='primary' onClick={onAdd}>
            新增
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{ type: 'checkbox' }}
        rowKey='_id'
        columns={columns}
        dataSource={deptData?.length ? deptData : fakeData}
        pagination={false}
      />
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}

export default Dept
