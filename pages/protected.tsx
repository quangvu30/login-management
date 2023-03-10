import Layout from '@/Layouts'
import Loader from '@/components/Common/Loader'

import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import { Table } from 'antd'
import axios from 'axios'

interface DataSource {
  key: number
  ipAddress: string
  time: string
}

const Protected: NextPage = (): JSX.Element => {
  const { status, data } = useSession()
  const [loginHistories, setLoginHistories] = useState([] as DataSource[])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const pageSize = 10

  const dataSource: DataSource[] = []

  const columns = [
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
  ]

  const getData = (page: number) => {
    setLoading(true)
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/loginHistory?page=${page}&limit=${pageSize}`,
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const listLogin = response.data?.data?.loginHistories
        for (var i = 0; i < listLogin.length; i++) {
          dataSource.push({
            key: i + 1,
            ipAddress: listLogin[i]['ipAddress'],
            time: listLogin[i]['createdAt'],
          })
        }
        setLoginHistories(dataSource)
        setTotalPages(response.data?.data?.totalPages)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin')
    getData(1)
  }, [status, totalPages])
  console.log(totalPages)
  if (status === 'authenticated')
    return (
      <>
        <Table
          loading={loading}
          dataSource={loginHistories}
          columns={columns}
          pagination={{
            pageSize: pageSize,
            total: totalPages,
            onChange: (page) => {
              getData(page)
            },
          }}
        />
      </>
    )

  return <Loader />
}

export default Protected
