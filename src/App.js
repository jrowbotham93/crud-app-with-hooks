import React, { useState } from 'react';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';

export default function App() {
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]

  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  const [ users, setUsers ] = useState(usersData)
  
  const addUser = user => {
    user.id = users.length + 1
    setUsers([ ...users, user ])
  }

  const deleteUser = id => {
    setUsers(users.filter(user =>
      user.id !== id))
  }

  const editRow = user => {
    setEditing(true)
    setCurrentUser({ 
        id: user.id, 
        name: user.name, 
        username: user.username 
      })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map(user =>
      (user.id === id ? updatedUser : user)))
  }

  return (
    <main className="container">
      <section className="flex-row">     
      {editing ? (
        <div>
          <h2>Edit user</h2>
          <EditUserForm
            editing={editing}
            setEditing={setEditing}
            currentUser={currentUser}
            updateUser={updateUser}
          />
        </div>
      ) : (
        <div>
          <h2>Add user</h2>
          <AddUserForm addUser={ addUser }/>
        </div>
      )}
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable 
            users={ users } 
            deleteUser={ deleteUser }
            editRow={ editRow }/>
        </div>
      </section>
    </main>
  );
}
