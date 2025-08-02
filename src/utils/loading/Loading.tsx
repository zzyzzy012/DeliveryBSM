import { Spin } from 'antd'
import './loading.less'

export default function Loading({ tip = 'loading' }: { tip?: string }) {
  return (
    <Spin size='large' className='loading'>
      <div>{tip}</div>
    </Spin>
  )
}
