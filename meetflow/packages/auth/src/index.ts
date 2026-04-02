import { getServerSession, Session } from 'next-auth';
import { authOptions } from './auth-options';

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<any | null> {
  const session = await getSession();
  return session?.user ?? null;
}
