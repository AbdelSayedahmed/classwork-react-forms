import React, { useState } from "react";
import "./Form.css";

export default function Form() {
  const initialFormData = {
    default: "",
  };

  const [values, setValues] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [inputError, setInputError] = useState(false);

  const numbers = values.split(",").map((x) => parseInt(x));

  function getMode(arr) {
    const obj = arr.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let mathResult = 0;

    if (numbers.some(isNaN)) {
      setInputError(true);
      setResult("Invalid Input!");
      return;
    }

    switch (operation) {
      case "sum":
        mathResult = numbers.reduce((a, b) => a + b);
        break;
      case "difference":
        mathResult = numbers.reduce((a, b) => a - b);
        break;
      case "product":
        mathResult = numbers.reduce((a, b) => a * b);
        break;
      case "quotient":
        mathResult = numbers.reduce((a, b) => a / b);
        break;
      case "average":
        mathResult = numbers.reduce((a, b) => a + b) / numbers.length;
        break;
      case "mode":
        mathResult = getMode(numbers);
        break;
      default:
        mathResult = "Invalid Input!";
        break;
    }

    setResult(mathResult);
    setInputError(false);
    setValues("");
    setOperation("");
  };

  const handleReset = () => {
    if (result !== "Invalid Input!") {
      setValues("");
      setOperation("");
    }
    setInputError(false);
  };

  return (
    <>
      <form>
        <input
          id="values"
          name="values"
          type="text"
          value={values}
          onChange={(e) => {
            setValues(e.target.value);
            setInputError(false);
          }}
          className={inputError ? "error" : ""}
        />
        <select
          id="operation"
          name="operation"
          value={operation}
          onChange={(e) => {
            setOperation(e.target.value);
            setInputError(false);
          }}
          className={inputError ? "error" : ""}
        >
          <option value=""></option>
          <option value="average">Average</option>
          <option value="mode">Mode</option>
          <option value="sum">Sum</option>
          <option value="difference">Difference</option>
          <option value="product">Product</option>
          <option value="quotient">Quotient</option>
        </select>
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
            handleReset();
          }}
        >Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}