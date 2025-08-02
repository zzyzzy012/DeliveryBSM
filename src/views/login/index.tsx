import { Button, Form, Input, App } from 'antd'
import styles from './index.module.less'
import api from '@/api'
import type { Login } from '@/types/api'
import useStore from '@/store'
import storage from '@/utils/storage'

function Login() {
  const { message } = App.useApp()
  const updateToken = useStore((state) => state.updateToken)
  const onFinish = async (values: Login.params) => {
    try {
      const res = await api.login(values) as string
      storage.set('token', res)
      updateToken(res)
      message.success('登陆成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      message.error('用户名或密码错误')
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <h3 className={styles.title}>系统登陆</h3>     
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="userPwd"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
