import { Inter } from 'next/font/google';
import Link from 'next/link';
import DarkModeButton from '@/components/DarkModeButton'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen flex flex-col ${inter.className} bg-zinc-100 dark:bg-zinc-800`}>
      <div className="flex-1 flex flex-col justify-center items-center space-y-8">
        <p className="text-6xl md:text-8xl font-extrabold text-gray-800 dark:text-white">HBKU Class Scheduler</p>
        <Link href="/student/login">
          <span
            className="px-12 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-md hover:from-teal-500 hover:to-blue-500 transition-all duration-100 hover:ring-4 transform animate-pulse hover:animate-none">
            Login
          </span>
        </Link>
      </div>
      <footer
        className="mt-auto border-t dark:border-gray-700 w-full text-center bg-zinc-200 dark:bg-zinc-900 p-4 flex flex-row justify-between">
        <p className="text-gray-400">Made By Elyas Al-Amri &copy; {new Date().getFullYear()}</p>
        <DarkModeButton/>
      </footer>
    </main>
  );
}