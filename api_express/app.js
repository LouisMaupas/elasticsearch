const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
const cors = require("cors");

const app = express();
const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "q_v0cZek=Ne5VWdJ*HJg",
  },
  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

// GET
app.get("/all", async (req, res) => {
  let result = await client.search({
    index: "restaurants",
    body: {
      size: 1000,
      query: {
        match_all: {},
      },
    },
  });

  res.json(result);
});

app.get("/search/:property", async (req, res) => {
  let { property } = req.params;
  let { q } = req.query;

  if (!q) {
    return res.json({ error: "Missing query parameter" });
  }

  let result;
  switch (property) {
    case "etablissement":
    case "chef":
    case "etoiles":
    case "commune":
      result = await client.search({
        index: "restaurants",
        body: {
          query: {
            match: {
              [property]: q,
            },
          },
        },
      });
      break;

    default:
      return res.json({ error: "Invalid property parameter" });
  }

  res.json(result);
});

app.get("/star/:filter/:value", async (req, res) => {
  const { filter, value } = req.params;
  let result;

  switch (filter) {
    case "atleast":
      result = await client.search({
        index: "restaurants",
        body: {
          query: {
            range: {
              // requête de type 'range' pour obtenir un intervalle de valeurs
              etoiles: {
                // champ sur lequel filtrer : "etoiles"
                gte: value, // greater than or equal
              },
            },
          },
        },
      });
      break;
    case "atmost":
      result = await client.search({
        index: "restaurants",
        body: {
          query: {
            range: {
              etoiles: {
                lte: value,
              },
            },
          },
        },
      });
      break;
    case "exactly":
      result = await client.search({
        index: "restaurants",
        body: {
          query: {
            term: {
              etoiles: value,
            },
          },
        },
      });
      break;
    default:
      return res.json({ error: "Invalid filter parameter" });
  }

  res.json(result);
});

// TODO WIP
app.get("/search/etablissement", async (req, res) => {
  let { q } = req.query;

  if (!q) {
    return res.json({ error: "Missing query parameter" });
  }

  let result;
  try {
    result = await client.search({
      index: "restaurants",
      body: {
        query: {
          match_phrase: {
            etablissement: q,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Failed to execute search query" });
  }

  res.json(result);
});

// POST
app.post("/add", async (req, res) => {
  const { etablissement, chef, etoiles, commune } = req.body;
  if (!etablissement || !chef || !etoiles || !commune) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await client.index({
      index: "restaurants",
      body: {
        etablissement,
        chef,
        etoiles,
        commune,
      },
    });

    console.log(response);

    res.status(201).json({ message: "Restaurant added successfully" });
  } catch (error) {
    console.error(error.meta.body.error);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
