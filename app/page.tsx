"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8080/hello", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.text();
      setMessage(data);
      setError("");
    } catch (e: any) {
      setError(`Failed to fetch: ${e.message}`);
      setMessage("");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Test Page</h1>
        <p>Click the button to get a message from the Go server.</p>
        <div className={styles.ctas}>
          <button className={styles.primary} onClick={fetchData}>
            Get Message
          </button>
        </div>
        {message && (
          <div>
            <h2>Server Response:</h2>
            <p>{message}</p>
          </div>
        )}
        {error && (
          <div>
            <h2>Error:</h2>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}
