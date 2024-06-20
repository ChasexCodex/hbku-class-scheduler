import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});


export default function LoginPage() {
  return (
    <main className={`h-screen w-screen flex justify-center items-center bg-zinc-900 ${inter.className}`}>
      <form className="grid grid-cols-5 border-2 p-16 rounded-3xl gap-x-20 shadow-md shadow-white bg-zinc-800">
        <div className="grid grid-cols-1 col-span-2 gap-y-4">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <label htmlFor="password" className="text-xl">
            Password
          </label>
        </div>
        <div className="grid grid-cols-1 col-span-3 gap-y-4 text-black min-w-96">
          <input type="email" name="email" className="rounded-md p-2" placeholder="HBKU Email..."/>
          <input type="password" name="password" className="rounded-md p-2" placeholder="Your password...."/>
        </div>
      </form>
    </main>
  )
}

