import "./style";

import {
  getRandomLower,
  getRandomNumber,
  getRandomSymbol,
  getRandomUpper,
} from "./helper";

import { useState } from "preact/hooks";

export default function App() {
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [length, setLength] = useState(20);
  const [result, setResult] = useState("");

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  const getResult = () => {
    setResult(generatePassword(lowercase, uppercase, numbers, symbols, length));
  };
  const generatePassword = (lower, upper, number, symbol, length) => {
    let pwString = "";
    const typesCount = lower + upper + number + symbol;
    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) return "";

    for (let i = 0; i < length; i += typesCount) {
      // eslint-disable-next-line no-loop-func
      typesArray.forEach((type) => {
        const funcName = Object.keys(type)[0];
        pwString += randomFunc[funcName]();
      });
    }

    return pwString.slice(0, length);
  };
  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");

    if (!result.length) return;

    textArea.value = result;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    // eslint-disable-next-line no-alert
    alert("Passwort wurde kopiert");

    textArea.value = "";
  };

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="result-container">
        <span id="result">{result}</span>
        <button className="btn" onClick={copyToClipboard}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="copy"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
            />
          </svg>
        </button>
      </div>
      <div className="settings">
        <div className="setting">
          <label>Passwort länge</label>
          <input
            type="number"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="setting">
          <label>Großbuchstaben verwenden</label>
          <input
            type="checkbox"
            id="uppercase"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
        </div>
        <div className="setting">
          <label>Kleinbuchstaben verwenden</label>
          <input
            type="checkbox"
            id="lowercase"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
          />
        </div>
        <div className="setting">
          <label>Nummern verwenden</label>
          <input
            type="checkbox"
            id="numbers"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
          />
        </div>
        <div className="setting">
          <label>Zeichen verwenden</label>
          <input
            type="checkbox"
            id="symbols"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
        </div>
      </div>
      <button className="btn btn-large" id="generate" onClick={getResult}>
        Passwort generieren
      </button>
    </div>
  );
}
