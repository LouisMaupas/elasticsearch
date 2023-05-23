"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState("");
  const [document, setDocument] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ index, document }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // Faites quelque chose avec la réponse d'Elasticsearch
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  console.log("ELASTIC_URL = ", process.env);
  console.log("ELASTIC_URL 1 = ", process.env.ELASTIC_URL);
  console.log("ELASTIC_URL 2 = ", process.env.NEXT_PUBLIC_ELASTIC_URL);
  return (
    <main className={styles.main}>
      <div>partie recherche</div>
      <div>display</div>
    </main>
  );
}
