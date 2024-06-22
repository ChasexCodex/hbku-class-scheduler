export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-zinc-900">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"/>
    </div>
  )
}