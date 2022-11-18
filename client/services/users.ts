import { registerInterface } from '../../common/interface';

export async function register(user: registerInterface) {
  const res = await fetch(`${process.env.DATABASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(user),
  });
  console.log(res.json());
}

export async function getUser() {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}/users/me`);
  } catch (error) {
    return null;
  }
}
