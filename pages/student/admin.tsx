import {handle, submitForm} from '@/utils/form'
import {save, load} from '@/utils/storage'
import {useArrayState} from '@/hooks/state'
import {useEffect} from 'react'

const AdminPage = () => {
  const {value: cores, setValue: setCores, add, remove, update} = useArrayState<string>()

  useEffect(() => {
    setCores(load('cores', []))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateSave = (index: number) => (value: string) => {
    save('cores', update(value, index))
  }

  const handleRemove = (index: number) => () => {
    save('cores', remove(index))
  }

  return (
    <div>
      <h1>Admin</h1>

      <form onSubmit={submitForm(() => {
      })}>
        <h2>Cores</h2>
        <div className="grid grid-cols-1 max-w-40">
          {cores.map((core, i) => (
            <div key={i} className="flex">
              <input type="text" defaultValue={core} onChange={handle(updateSave(i))}/>
              <button onClick={handleRemove(i)}>Remove</button>
            </div>
          ))}
        </div>
        <button onClick={() => add('')}>
          Add Core
        </button>
        <br/>
      </form>
    </div>
  )
}

export default AdminPage
