import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [values, setValues] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");

  const numbers = values.split(",").map((x) => parseInt(x));

  function getMode(arr) {
    const obj = arr.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});
  
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let mathResult = 0;

    switch (operation) {
      case "sum":
        mathResult = numbers.reduce((a, b) => a + b, 0);
        break;
      case "average":
        mathResult = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        break;
      case "mode":
        mathResult = getMode(numbers);
        break;
      default:
        mathResult = "Invalid Input!";
    }

    setResult(mathResult);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          id="values"
          name="values"
          type="text"
          onChange={(e) => setValues(e.target.value)}
        />
        <select
          id="operation"
          name="operation"
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;
