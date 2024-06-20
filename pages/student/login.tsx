import {Inter} from "next/font/google";
import {useState} from "react";
import {useRouter} from "next/router";
import {login} from "@/utils/auth";

const inter = Inter({subsets: ["latin"]});

type LoginData = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target);

    const res = await login(formData)

    if (res.success) {
      return await router.replace('/student/dashboard')
    } else {
      setError(res.error)
    }
  }

  return (
    <main className={`h-screen w-screen flex justify-center items-center bg-zinc-900 ${inter.className}`}>
      <form onSubmit={handleSubmit}
            className="grid grid-cols-5 border-2 p-16 rounded-3xl gap-x-20 gap-y-10 shadow-md shadow-white bg-zinc-800">
        <div className="grid grid-cols-1 col-span-2 gap-y-4">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <label htmlFor="password" className="text-xl">
            Password
          </label>
        </div>
        <div className="grid grid-cols-1 col-span-3 gap-y-4 text-black min-w-96">
          <input type="email" name="email" id="email" className="rounded-md p-2" placeholder="HBKU Email..."/>
          <input type="password" name="password" id="password" className="rounded-md p-2"
                 placeholder="Your password...."/>
        </div>
        <button
          type="submit"
          className="col-span-5 bg-blue-500 text-white rounded-md p-2 text-xl font-bold hover:bg-blue-700">
          Login
        </button>
        {/*  Error section */}
        {error &&
          <div className="relative bg-red-500 col-span-5 rounded">
            <button className="absolute top-0 right-2">
              x
            </button>
            <p className="font-bold text-white p-2 mt-4">
              {error}
            </p>
          </div>
        }
      </form>
    </main>
  )
}

