import { Form, Input, Select, Modal, Upload } from 'antd'
import { useState, useImperativeHandle } from 'react'
import type { GetProp, UploadProps } from 'antd'
import { message } from '@/utils/AntDGlobal'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'
import type { User } from '@/types/api'
import type { IModalProp, IAction } from '@/types/modal'
import api from '@/api'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  // 定义弹窗打开方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
      setImageUrl(data.userImg)
    } else {
      form.resetFields()
    }
  }
  // 暴露open方法给父组件
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  // 弹窗onOk确认方法
  const onSubmit = async () => {
    try {
      const valid = await form.validateFields()
      if (valid) {
        const params = {
          ...form.getFieldsValue(),
          userImg: imageUrl
        }
        if (action === 'create') {
          await api.createUser(params)
          message.success('用户创建成功')
        } else {
          await api.editUser(params)
          message.success('用户修改成功')
        }
      }
      handleCancel()
      props.update?.()
    } catch (error) {
      console.error('失败了', error)
    }
  }

  const handleCancel = () => {
    setVisible(false)
    // 需要手动清空头像
    setImageUrl('')
    form.resetFields()
  }

  // 上传头像
  const [imageUrl, setImageUrl] = useState<string>()
  const [loading, setLoading] = useState(false)

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传jpeg或者png格式的图片')
    }
    const isLt500KB = file.size / 1024 / 1024 < 0.5
    if (!isLt500KB) {
      message.error('图片大小不能超过500KB')
    }
    return isJpgOrPng && isLt500KB
  }

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      const { code, data, msg } = info.file.response
      if (code === 0) {
        setImageUrl(data.file)
      } else {
        message.error(msg)
      }
    } else if (info.file.status === 'error') {
      message.error('服务器异常，请稍后重试')
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Modal
      title={action === 'create' ? '创建用户' : '编辑用户'}
      centered
      width={800}
      open={visible}
      okText='确认'
      cancelText='取消'
      closable
      onOk={onSubmit}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 4 }}
        style={{ maxWidth: 700 }}
        initialValues={{ remember: true }}
        autoComplete='off'
      >
        <Form.Item label='userId' name='userId' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='用户名称'
          name='userName'
          rules={[
            { required: true, message: '请输入用户名称' },
            { min: 5, max: 15, message: '用户名称最小5个字符，最大15个字符' }
          ]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          label='用户邮箱'
          name='userEmail'
          rules={[
            { required: true, message: '请输入用户邮箱' },
            { type: 'email', message: '请输入正确的邮箱' }
          ]}
        >
          {/* 禁止修改邮箱 */}
          <Input placeholder='请输入用户邮箱' disabled={action === 'edit'} />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='mobile'
          rules={[
            { len: 11, message: '请输入11位手机号' },
            { pattern: /1[1-9]\d{9}$/, message: '请输入1开头的11位手机号' }
          ]}
        >
          <Input type='number' placeholder='请输入手机号'></Input>
        </Form.Item>
        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请选择部门' }]}>
          <Input placeholder='请输入部门'></Input>
        </Form.Item>
        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位'></Input>
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select
            placeholder='请选择状态'
            options={[
              { value: 1, label: '在职' },
              { value: 2, label: '离职' },
              { value: 3, label: '试用期' }
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label='系统角色' name='roleList'>
          <Input placeholder='请输入系统角色'></Input>
        </Form.Item>
        <Form.Item label='用户头像' name='userImg'>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            headers={{
              Authorization: 'Bearer' + storage.get('token'),
              icode: 'B815F86524423DB0'
            }}
            action='/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
