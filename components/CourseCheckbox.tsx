type Props = {
  course: string
  details: any
  selected: boolean
  onChange: () => void
}

const CourseCheckbox = ({course, details, selected, onChange}: Props) => {
  return (
    <div className="flex items-center space-x-2 p-1 bg-zinc-50 dark:bg-zinc-700 rounded-lg">
      <input
        type="checkbox"
        id={course}
        name={course}
        checked={selected}
        onChange={onChange}
        className="hidden"
      />
      <div
        onClick={onChange}
        className={`w-4 h-4 flex justify-center items-center border border-gray-300 rounded-sm cursor-pointer ${
          selected ? 'bg-blue-500' : 'bg-transparent'
        }`}
      >
        {selected && (
          <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
               viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <label htmlFor={course} className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
        {details.name} - {details.section} ({details.title})
      </label>
    </div>
  )
}

export default CourseCheckbox