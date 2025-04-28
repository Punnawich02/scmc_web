import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  // Construct auth URL
  const authUrl = `${process.env.AUTH_URL}?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.CALLBACK_URL}&scope=${process.env.SCOPE}`;

  return (
    <div>
      <html></html>
      <body>
        <main className={styles.main}>
          <h1>Next.js OAuth Authorization Code Flow</h1>
          <div>
            <Link href={authUrl} className={styles.loginButton}>
              Log in with CMU account
            </Link>
          </div>
        </main>
      </body>
    </div>
  );
}
