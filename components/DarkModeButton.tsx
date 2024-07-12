import {useTheme} from 'next-themes'
import useMounted from '@/hooks/useMounted'

const DarkModeButton = () => {
  const {theme: storedTheme, setTheme} = useTheme()

  const mounted = useMounted()

  const theme = mounted ? storedTheme : 'light'

  return (
    <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <div className="flex items-center">
        <div className="w-14 bg-gray-300 dark:bg-[#33353F] rounded-full p-1 dark-transition ease-in-out">
          <div
            className={`w-min h-min aspect-square bg-white dark:bg-[#ADB7BE] rounded-full shadow-md transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'} duration-500 ease-in-out flex justify-center items-center`}>
            <span className="leading-5" suppressHydrationWarning>
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default DarkModeButton