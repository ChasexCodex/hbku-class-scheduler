import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ComponentType, ReactNode} from 'react'
import {AuthProvider} from '@/hooks/AuthContext'
import {ThemeProvider} from 'next-themes'
import ErrorBoundary from '@/components/ErrorBoundary'
import SWRConfiguration from '@/components/SWRConfiguration'
import {SpeedInsights} from '@vercel/speed-insights/next'

type Props = {
  Component: AppProps['Component'] & { layout?: ComponentType }
  pageProps: AppProps['pageProps']
}

const defaultLayout = ({children}: { children: ReactNode }) => (
  <>
    {children}
  </>
)

const Providers = ({children}: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthProvider>
      <SWRConfiguration>
        {children}
      </SWRConfiguration>
    </AuthProvider>
  </ThemeProvider>
)

export default function App({Component, pageProps}: Props) {
  const Layout = Component.layout || defaultLayout
  return (
    <ErrorBoundary>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <SpeedInsights/>
      </Providers>
    </ErrorBoundary>
  )
}
