import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ComponentType, ReactNode} from "react";
import {AuthProvider} from "@/hooks/AuthContext";

type Props = {
  Component: AppProps["Component"] & { layout?: ComponentType }
  pageProps: AppProps["pageProps"]
}

const defaultLayout = ({children}: { children: ReactNode }) => (
  <>
    {children}
  </>
)

export default function App({Component, pageProps}: Props) {
  const Layout = Component.layout || defaultLayout;
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
