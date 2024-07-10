import {useTheme} from 'next-themes'

const ThemeSwitch = () => {
  const {theme, setTheme} = useTheme()

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-8 h-8 p-1 rounded-full"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '🌞' : '🌜'}
    </button>
  )
}

export default ThemeSwitch