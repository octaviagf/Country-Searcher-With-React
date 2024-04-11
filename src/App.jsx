import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const result = await response.json();
      console.log(result);
      setData(result);
    }
    getData();
  }, []);

  function searchCountry(countryName) {
    if (countryName && data.length > 0) {
      const countrySearch = data.find((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      );
      setCountry(countrySearch);
      if (!countrySearch) {
        alert("Country not found.");
      }
    } else if (countryName === "") {
      alert("No empty fields.");
    }
  }

  return (
    <div>
      <Form input={input} setInput={setInput} onSearchCountry={searchCountry} />
      <ShowCountries country={country} />
    </div>
  );
}

function Form({ input, setInput, onSearchCountry }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearchCountry(input);
    setInput("");
  }
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Country"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn">
          Search Country
        </button>
      </form>
    </div>
  );
}

function ShowCountries({ country }) {
  return (
    <div className="country">
      {country ? (
        <div>
          <h2 className="info">{country.name.official}</h2>
          <img
            src={country.flags.png}
            alt={country.name.official}
            className="info"
          />
          <p className="info">Continent: {country.region}</p>
          <p className="info">Capital: {country.capital}</p>
          <p className="info">Population: {country.population}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
