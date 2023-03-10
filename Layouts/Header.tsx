import { signIn, signOut, useSession } from 'next-auth/react'
import { Layout, Avatar, Dropdown, Space, Button } from 'antd'
import Title from 'antd/lib/typography/Title'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Router from 'next/router'

const { Header } = Layout
export default function LayoutHeader() {
  const { data: session } = useSession()
  const items: MenuProps['items'] = [
    {
      label: <a href="/protected">Home</a>,
      key: '0',
    },
    {
      label: <a href="/profile">Profile</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Sign out
        </a>
      ),
      key: '4',
    },
  ]

  if (session?.user?.role === 'admin') {
    items.splice(2, 0, { label: <a href="/admin">Manager</a>, key: '2' })
  }
  return (
    <Layout>
      <Header style={{ padding: 10 }}>
        {session?.user ? (
          <div>
            <div style={{ float: 'right', color: 'white', marginTop: -15 }}>
              <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {session?.user?.email}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>

            <Avatar
              style={{ float: 'right', border: 'solid', marginRight: 10 }}
            >
              <UserOutlined />
            </Avatar>
          </div>
        ) : (
          <div style={{ float: 'right', color: 'white', marginTop: -15 }}>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                Router.replace('/auth/register')
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => {
                signIn()
              }}
            >
              Login
            </Button>
          </div>
        )}

        <Title style={{ color: 'white' }} level={3}>
          Login Management
        </Title>
      </Header>
    </Layout>
  )
}
