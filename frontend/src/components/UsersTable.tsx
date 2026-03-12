import { useState, useMemo } from 'react';
import type { User } from '../types';
import { flattenObject, toHeaderLabel, getNextSortState, sortByFlatKey } from '../utils/tableUtils';
import type { SortState } from '../utils/tableUtils';

type Props = { users: User[] };

function UsersTable({ users }: Props) {
  const [sort, setSort] = useState<SortState>(null);

  if (users.length === 0) return null;

  const locationKeys = Object.keys(
    flattenObject(users[0].location as unknown as Record<string, unknown>)
  );

  function handleSort(key: string) {
    setSort((prev) => getNextSortState(prev, key));
  }

  const sortedUsers = useMemo(() =>
    sortByFlatKey(users, sort, (user) => ({
      name: `${user.name.first} ${user.name.last}`,
      ...flattenObject(user.location as unknown as Record<string, unknown>),
    }))
  , [users, sort]);

  function sortIndicator(key: string) {
    if (sort?.key !== key) return <span className="sort-icon">⇅</span>;
    return <span className="sort-icon active">{sort.dir === 'asc' ? '↑' : '↓'}</span>;
  }

  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>Avatar</th>
          <th className="sortable" onClick={() => handleSort('name')}>
            Name {sortIndicator('name')}
          </th>
          {locationKeys.map((key) => (
            <th key={key} className="sortable" onClick={() => handleSort(key)}>
              {toHeaderLabel(key)} {sortIndicator(key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => {
          const flat = flattenObject(user.location as unknown as Record<string, unknown>);
          return (
            <tr key={user.login.uuid}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="table-avatar"
                />
              </td>
              <td>{user.name.first} {user.name.last}</td>
              {locationKeys.map((key) => (
                <td key={key}>{flat[key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UsersTable;


