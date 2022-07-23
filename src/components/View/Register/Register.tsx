import { Button, Form, Input } from 'antd'
import useAuth from '../../../context/useAuth'
import { RegisterInput } from '../../../types'
import styles from './Register.module.scss'

const Register = () => {
  const { register } = useAuth()
  const handleOnFinish = (values: RegisterInput) => {
    register?.(values)
  }
  return (
    <div className={styles.Register}>
      <Form
        name='basic'
        onFinish={handleOnFinish}
      >
        <Form.Item label='Username' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <Input />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input.Password />
        </Form.Item>
        <Form.Item label='Confirm Password' name='password_confirmation'>
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

export default Register
