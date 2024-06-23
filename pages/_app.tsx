import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ComponentType, ReactNode} from "react";
import {AuthProvider} from "@/hooks/AuthContext";
import {ThemeProvider} from "next-themes";

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}
