import React, { useMemo, useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const countryOptions = useMemo(
    () => [
      { value: "", label: "Any country" },
      { value: "PK", label: "Pakistan" },
      { value: "IN", label: "India" },
      { value: "AE", label: "United Arab Emirates" },
      { value: "SA", label: "Saudi Arabia" },
      { value: "GB", label: "United Kingdom" },
      { value: "US", label: "United States" },
      { value: "CA", label: "Canada" },
      { value: "AU", label: "Australia" },
      { value: "DE", label: "Germany" },
      { value: "FR", label: "France" },
    ],
    []
  );

  const submit = (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();
    if (!trimmedCity) {
      return;
    }

    const query = country ? `${trimmedCity},${country}` : trimmedCity;
    onSearch(query);

    setCity("");
    setCountry("");
  };

  return (
    <form className="search-form" onSubmit={submit}>
      <div className="search-fields">
        <input
          className="search-input"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City"
        />

        <select
          className={`search-input search-select${country ? " has-value" : ""}`}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-label="Country"
        >
          {countryOptions.map((option) => (
            <option key={option.value || "placeholder"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        className="search-button"
        type="submit"
        disabled={isLoading || !city.trim()}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
      
    </form>
  );
};

export default SearchBar;