import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function Error404() {
  const navigate = useNavigate()
  const onHomeBack = () => {
    navigate('/')
  }
  return (
    <div>
      <Result
        status='404'
        title='404'
        subTitle='对不起，您访问的页面不存在'
        extra={
          <Button type='primary' onClick={onHomeBack}>
            返回首页
          </Button>
        }
      ></Result>
    </div>
  )
}

export default Error404
