import {PropsWithChildren} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export default function UserLayout({children}: PropsWithChildren) {
  return (
    <main className={`min-h-screen w-screen ${inter.className}`}>
      {children}
    </main>
  )
}