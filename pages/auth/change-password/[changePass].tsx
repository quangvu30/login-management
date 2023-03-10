import axios from 'axios'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import Title from 'antd/lib/typography/Title'
import { signOut } from 'next-auth/react'

interface IUserData {
  token: string
  newPassword: string
}

const ChangePassword = () => {
  const router = useRouter()
  const [userData, updateUserData] = useState({} as IUserData)
  const { changePass } = router.query

  useEffect(() => {
    updateUserData({ ...userData, token: String(changePass) })
  }, [])

  return (
    <>
      <Title style={{ textAlign: 'center', marginTop: 50 }} level={2}>
        Change Password
      </Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
          marginTop: 50,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            onChange={({ target }) => {
              updateUserData({ ...userData, newPassword: target.value })
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={async () => {
              const res = await axios({
                method: 'PUT',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/auth/changePassword',
                data: userData,
              })
              console.log(res.data)
              if (res.data.success) {
                signOut()
                alert('Change Password Success')
                // Router.replace("/");
              } else {
                alert(res.data.error)
              }
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ChangePassword
