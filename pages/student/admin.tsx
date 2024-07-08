import {useEffect, useState} from "react"
import {submitForm} from "@/utils/form";
import {getCores, updateCores} from "@/utils/admin";

const AdminPage = () => {
  const [cores, setCores] = useState<string[]>([])

  useEffect(() => {
    setCores(getCores())
  }, []);

  const handleChange = (index: number, value: string) => {
    setCores(cores.map((core, i) => i === index ? value : core))
    updateCores(cores)
  }

  return (
    <div>
      <h1>Admin</h1>

      <form onSubmit={submitForm(() => {
      })}>
        <h2>Cores</h2>
        <div className="grid grid-cols-1 max-w-40">
          {cores.map((core, i) => (
            <input key={i} value={core} onChange={(e) => handleChange(i, e.target.value)}/>
          ))}
        </div>
        <button onClick={() => setCores([...cores, ''])}>
          Add Core
        </button>
        <br/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default AdminPage
