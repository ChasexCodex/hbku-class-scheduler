import UserLayout from "@/layouts/UserLayout";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  return (
    <main className={`h-screen w-screen flex justify-center items-center ${inter.className}`}>
      <p className="text-8xl font-bold">HBKU Class Scheduler</p>
    </main>
  )
}

Home.layout = UserLayout;