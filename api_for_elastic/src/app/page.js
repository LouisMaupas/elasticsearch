"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { elasticClient } from "../../src/app/utils/elasticsearch.js";

export default function Home() {
  const [index, setIndex] = useState("");
  const [document, setDocument] = useState("");

  // Exemple de recherche
  async function searchDocuments(query) {
    try {
      const response = await elasticClient.search({
        index: "votre_index",
        body: {
          query: {
            match: {
              field: query,
            },
          },
        },
      });

      return response.body.hits.hits;
    } catch (error) {
      // Gérez les erreurs
      console.error("Erreur de recherche Elasticsearch :", error);
      throw error;
    }
  }

  return (
    <main className={styles.main}>
      <div>
        partie recherche
        <button onClick={() => searchDocuments("field")}>button</button>
      </div>
      <div>display</div>
    </main>
  );
}
