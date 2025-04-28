import { cookies } from 'next/headers';
import { getToken } from '../../lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import styles from "../page.module.css"

// Make sure server doesn't cache this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = getToken(await cookieStore);
  
  if (!token) {
    // Redirect to home page if no token
    redirect('/api/login');
  }

  // Fetch user's basic info
  let basicInfo = null;
  let error = null;

  try {
    const response = await fetch(process.env.BASICINFO_URL!, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    basicInfo = await response.json();
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    error = 'Failed to load profile data';
  }

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>
      
      {error && <div className={styles.error}>Error: {error}</div>}
      
      <div>
        <h2>Access Token:</h2>
        <pre className={styles.codeBlock}>
          {JSON.stringify(token, null, 2)}
        </pre>
        <hr />
        
        <h2>Basic Info:</h2>
        <pre className={styles.codeBlock}>
          {basicInfo ? JSON.stringify(basicInfo, null, 2) : 'Loading...'}
        </pre>
        <hr />
        
        <Link href="/api/auth/logout" className={styles.logoutButton}>
          Logout
        </Link>
      </div>
    </div>
  );
}