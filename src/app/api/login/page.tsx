import Link from "next/link";
import styles from "../page.module.css";

export default function Home() {
  const auth_url = process.env.AUTH_URL;
  const client_id = process.env.CLIENT_ID;
  const callback_url = process.env.CALLBACK_URL;
  const scope = process.env.SCOPE;

  const authUrl = `${auth_url}?client_id=${client_id}&response_type=code&redirect_uri=${callback_url}&scope=${scope}`;

  return (
    <div className={styles.container}>
      <h1>OAuth2.0 Code Flow</h1>
      <div>
        <Link href={authUrl} className={styles.loginButton}>
          <button className={styles.loginButton}>
            Log in with CMU account
          </button>
        </Link>
      </div>
    </div>
  );
}
