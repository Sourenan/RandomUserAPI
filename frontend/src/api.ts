import type { User } from './types';

export async function fetchUsers(page: number): Promise<User[]> {
  const res = await fetch(`https://randomuser.me/api?results=20&page=${page}`);
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  const data = await res.json();
  return data.results as User[];
}
