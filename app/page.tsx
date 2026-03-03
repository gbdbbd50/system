"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [helloData, setHelloData] = useState<string | null>(null);
  const [usersData, setUsersData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHello = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setHelloData(JSON.stringify(data, null, 2));
    } catch (error) {
      setHelloData("Error: " + String(error));
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsersData(data);
    } catch (error) {
      setUsersData([{ error: String(error) }]);
    }
    setLoading(false);
  };

  return (
    <main className={styles.container}>
      <h1>Next.js TypeScript API Example</h1>

      <section className={styles.section}>
        <h2>API Routes Demo</h2>
        <button onClick={fetchHello} disabled={loading}>
          {loading ? "Loading..." : "Call /api/hello"}
        </button>
        {helloData && (
          <pre className={styles.output}>{helloData}</pre>
        )}
      </section>

      <section className={styles.section}>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? "Loading..." : "Call /api/users"}
        </button>
        {usersData && (
          <pre className={styles.output}>{JSON.stringify(usersData, null, 2)}</pre>
        )}
      </section>
    </main>
  );
}
