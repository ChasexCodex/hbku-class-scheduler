import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ComponentType, ReactNode} from 'react'
import {AuthProvider} from '@/hooks/AuthContext'
import {ThemeProvider} from 'next-themes'
import ErrorBoundary from '@/components/ErrorBoundary'
import SWRConfiguration from '@/components/SWRConfiguration'

type Props = {
  Component: AppProps['Component'] & { layout?: ComponentType }
  pageProps: AppProps['pageProps']
}

const defaultLayout = ({children}: { children: ReactNode }) => (
  <>
    {children}
  </>
)

export default function App({Component, pageProps}: Props) {
  const Layout = Component.layout || defaultLayout
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <SWRConfiguration>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfiguration>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
