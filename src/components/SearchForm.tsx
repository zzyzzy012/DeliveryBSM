import { Form, Space, Button } from 'antd'

const SearchForm = (props: any) => {
  return (
    <Form form={props.form} layout='inline' initialValues={props.initialValues}>
      {props.children}
      <Form.Item>
        <Space>
          <Button type='primary' onClick={props.onSearch}>
            搜索
          </Button>
          <Button onClick={props.onReset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SearchForm
