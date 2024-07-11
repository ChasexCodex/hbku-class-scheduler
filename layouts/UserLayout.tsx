import {PropsWithChildren} from "react";
import {Inter} from "next/font/google";
import DarkModeButton from '@/components/DarkModeButton'

const inter = Inter({subsets: ["latin"]});

export default function UserLayout({children}: PropsWithChildren) {
  return (
    <main className={`min-h-screen w-screen relative ${inter.className}`}>
      <div className="absolute bottom-2 right-2">
        <DarkModeButton/>
      </div>
      {children}
    </main>
  )
}