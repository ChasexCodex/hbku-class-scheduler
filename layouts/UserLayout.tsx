import {PropsWithChildren} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export default function UserLayout({children}: PropsWithChildren) {
  return (
    <main className={`h-screen w-screen flex justify-center items-center ${inter.className}`}>
      {children}
    </main>
  )
}