import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api?results=20')
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
     <div>
      <h1>Random Users</h1>
      <div>
        <ul className="users-list">
          {users.map((user , idx) => (
            <li key={user.login.uuid}>
              <div className="avatar">
                <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                <img className="avatar-large" src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
              </div>
              {idx + 1}. {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
