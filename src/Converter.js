import React, { useState, useEffect } from "react";

function Converter() {
  const baseRequestUrl = "http://localhost:8080";
  const [input, setInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(baseRequestUrl+"/convert/types")
      .then((response) => response.json())
      .then((data) => setTypes(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input || !selectedType) {
      return;
    }
    fetch(
      `${baseRequestUrl}/convert?input=${encodeURIComponent(
        input
      )}&type=${encodeURIComponent(selectedType)}`,
      { method: "GET" }
    )
      .then((response) => response.text())
      .then((data) => setResult(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <br />
        <label>
          Select a type:
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select a type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Convert</button>
      </form>
      {result && <div>Result: {result}</div>}
    </div>
  );
}

export default Converter;


