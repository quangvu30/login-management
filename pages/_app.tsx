import '@/styles/globals.css'
import '@/assets/scss/themes.scss'
import Layout from '@/Layouts'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
// import type { ReactElement, ReactNode } from 'react'
// import type { NextPage } from 'next'

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout
// }

export default function App({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout ?? ((page) => page)
  // return getLayout(<Component {...pageProps} />)
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
