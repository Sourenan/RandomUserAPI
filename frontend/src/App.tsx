import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { fetchUsers } from './api'
import type { User, Location } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  const userLocations = useMemo<Location[]>(() => users.map(u => u.location), [users]);

  useEffect(() => {
    fetchUsers(page).then(setUsers).catch(console.error);
  }, [page]);

  return (
    <div>
      <h1>Random Users</h1>
      <div>
        <ul className="users-list">
          {users.map((user, idx) => (
            <li key={user.login.uuid}>
              <div className="avatar">
                <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                <img className="avatar-large" src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
              </div>
              {idx + 1}. {user.name.first} {user.name.last} — {userLocations[idx]?.country}
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App
