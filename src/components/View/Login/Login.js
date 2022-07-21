import { Button, Form, Input } from 'antd'
import useAuth from '../../../context/useAuth'
import styles from './Login.module.scss'

const Login = () => {
  const { login } = useAuth()
  const handleOnFinish = (values) => {
    login(values)
  }
  return (
    <div className={styles.Login}>
      <Form
        name='basic'
        onFinish={handleOnFinish}
      >
        <Form.Item label='Email' name='email'>
          <Input />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
