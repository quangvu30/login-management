import Header from '@/Layouts/Header'
import { Button, Space, Table, Modal } from 'antd'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

interface Props {}

interface DataSource {
  key: number
  email: string
  password: string
  name: string
  birthday: Date
  role: string
}

interface DataSourceHistory {
  key: number
  ipAddress: string
  time: string
}

const Admin: FC<Props> = (props): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [listUser, setListUser] = useState([] as DataSource[])
  const [loginHistories, setLoginHistories] = useState(
    [] as DataSourceHistory[],
  )
  const [totalPages, setTotalPages] = useState(1)
  var email: string

  const pageSize = 10

  const showModal = () => {
    console.log(email)
    setIsModalOpen(true)
    getData(1)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '',
      key: '',
      render: (_: any, record: DataSource) => (
        <>
          <Button
            onClick={() => {
              // setEmail(record.email);
              email = record.email
              showModal()
            }}
          >
            Detail
          </Button>
        </>
      ),
    },
  ]

  const dataSource: DataSource[] = []
  const dataSourceHistory: DataSourceHistory[] = []
  const getDataUser = () => {
    setLoading(true)
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/user/listUser`,
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const listUser = response.data?.data
        for (var i = 0; i < listUser.length; i++) {
          dataSource.push({
            key: i + 1,
            ...listUser[i],
          })
        }
        setLoading(false)
        setListUser(dataSource)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getData = (page: number) => {
    setLoading(true)
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/loginHistory?page=${page}&limit=${pageSize}&email=${email}`,
    }
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const listLogin = response.data?.data?.loginHistories
        for (var i = 0; i < listLogin.length; i++) {
          dataSourceHistory.push({
            key: i + 1,
            ipAddress: listLogin[i]['ipAddress'],
            time: listLogin[i]['createdAt'],
          })
        }
        setLoginHistories(dataSourceHistory)
        setTotalPages(response.data?.data?.totalPages)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getDataUser()
  }, [])

  return (
    <>
      <Table columns={columns} dataSource={listUser} />;
      <Modal
        title="Login history"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          loading={loading}
          dataSource={loginHistories}
          columns={[
            {
              title: 'STT',
              dataIndex: 'key',
              key: 'key',
            },
            {
              title: 'IP Address',
              dataIndex: 'ipAddress',
              key: 'ipAddress',
            },
            {
              title: 'Time Login',
              dataIndex: 'time',
              key: 'time',
            },
          ]}
          pagination={{
            pageSize: pageSize,
            total: totalPages,
            onChange: (page) => {
              getData(page)
            },
          }}
        />
      </Modal>
    </>
  )
}

export default Admin
