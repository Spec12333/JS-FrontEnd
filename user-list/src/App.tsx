import { useState, useEffect} from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import type { UserData } from './types/Types'
import axios from 'axios'
import type { Account } from './components/AddUser'
function App() {
  const [users, setUsers] = useState<UserData[]>([])

  useEffect(() => {
    axios
    .get<UserData[]>('http://localhost:4000/users')
    .then(response => {
          setUsers(response.data)
        })
    }, [])

    const addUser = (newUserData:Account) => {
      axios
      .post('http://localhost:4000/users', newUserData)
      .then(response => {
        setUsers([...users, response.data])
      }
      )
    }

  return (
    <div>
      <AddUser
        onAdd={addUser}
      />
      <UserList
        users={users}
      />
    </div>
  )
}

export default App