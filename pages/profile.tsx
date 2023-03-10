import Header from '@/Layouts/Header'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button, Form, Input, Radio } from 'antd'
type LayoutType = Parameters<typeof Form>[0]['layout']
import axios from 'axios'
import Router from 'next/router'

interface IUserData {
  _id: string
  email: string
  name: string
  birthday: string
  role: string
}

const Profile: NextPage = (): JSX.Element => {
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal')
  const [userData, setUserData] = useState({} as IUserData)
  const { status, data } = useSession()

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const formItemLayout =
    formLayout === 'horizontal'
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null

  const getData = async () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/user/profile',
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        let uData = response.data?.data as IUserData
        const date = new Date(uData.birthday)
        uData.birthday = date.toISOString().split('T')[0]
        setUserData(uData)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin')
    getData()
  }, [])
  return (
    <>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        style={{
          maxWidth: 600,
          marginTop: 60,
        }}
      >
        <Form.Item label="Email">
          <Input value={userData?.email} disabled={true} />
        </Form.Item>
        <Form.Item label="Password">
          <Input placeholder="*******" disabled={true} />
          <Button
            onClick={async () => {
              const response = await axios({
                method: 'PATCH',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/auth/changePassword',
                data: {
                  email: userData.email,
                },
              })

              if (response.data.success) {
                alert('Please check your email to reset password')
              } else {
                alert(response.data.error)
              }
            }}
            type="link"
          >
            Reset password
          </Button>
        </Form.Item>
        <Form.Item label="Name">
          <Input
            onChange={({ target }) => {
              setUserData({ ...userData, name: target.value })
            }}
            value={userData?.name}
          />
        </Form.Item>
        <Form.Item label="Birthday">
          <Input
            onChange={({ target }) => {
              setUserData({ ...userData, birthday: target.value })
            }}
            type="date"
            value={userData?.birthday}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            type="primary"
            onClick={async () => {
              const response = await axios({
                method: 'PUT',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/user/profile',
                data: {
                  email: userData.email,
                  name: userData.name,
                  birthday: userData.birthday,
                },
              })

              if (response.data.success) {
                alert('Update Success')
              } else {
                alert(response.data.error)
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

export default Profile
