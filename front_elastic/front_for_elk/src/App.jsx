import { useEffect, useState, React } from "react";
import "./App.css";

function App() {
  const [res, setRes] = useState("");
  const [newRestaurant, setNewRestaurant] = useState({
    etablissement: "",
    chef: "",
    etoiles: "",
    commune: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = (url) => {
    fetch(`http://localhost:3000/${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data.hits.hits);
        setRes(data.hits.hits);
      })
      .catch((e) =>
        setRes("There was a problem with your fetch operation: " + e.message)
      );
  };

  const handleStarFilterChange = (value) => {
    fetchData(`star/${value}`);
  };

  const handleInputChange = (event) => {
    setNewRestaurant({
      ...newRestaurant,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNewRestaurant({
          etablissement: "",
          chef: "",
          etoiles: "",
          commune: "",
        });
        fetchData("all");
      })
      .catch((error) =>
        console.error("There was a problem with your fetch operation:", error)
      );
  };

  /**
   * Sets the search term based on the input event value.
   *
   * @param {Object} event - The input event.
   * @return {void}
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(`search/etablissement?q=${searchTerm}`);
  };

  useEffect(() => {
    fetchData("all");
  }, []);

  return (
    <>
      <div>
        <h1>Restos étoilés Lyonnais</h1>
        <div>Rechercher un établissement</div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="etablissement"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Trouver un établissement"
            required
          />
          <button type="submit">Rechercher</button>
        </form>
        <br />
        <div>
          Ajouter un resto
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="etablissement"
              value={newRestaurant.etablissement}
              onChange={handleInputChange}
              placeholder="Etablissement"
              required
            />
            <input
              type="text"
              name="chef"
              value={newRestaurant.chef}
              onChange={handleInputChange}
              placeholder="Chef"
              required
            />
            <input
              type="number"
              name="etoiles"
              value={newRestaurant.etoiles}
              onChange={handleInputChange}
              placeholder="Etoiles"
              required
            />
            <input
              type="text"
              name="commune"
              value={newRestaurant.commune}
              onChange={handleInputChange}
              placeholder="Commune"
              required
            />
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
      <br />
      <div>
        Filtrer par étoiles:
        <select onChange={(e) => handleStarFilterChange(e.target.value)}>
          <option value={"atleast/1"}>Au moins 1 étoile</option>
          <option value={"atleast/2"}>Au moins 2 étoiles</option>
          <option value={"exactly/3"}>Exactement 3 étoiles</option>
          <option value={"atmost/1"}>Au plus 1 étoile</option>
          <option value={"atmost/2"}>Au plus 2 étoiles</option>
        </select>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Chef</th>
            <th>Commune</th>
            <th>Etablissement</th>
            <th>Etoiles</th>
          </tr>
        </thead>
        {res ? (
          <tbody>
            {res.map((item) => (
              <tr key={item._id}>
                <td>{item._source.chef}</td>
                <td>{item._source.commune}</td>
                <td>{item._source.etablissement}</td>
                <td>{item._source.etoiles}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </>
  );
}

export default App;
