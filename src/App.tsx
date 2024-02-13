import React from 'react';
import XmlToJsonConverter from './components/XmlToJsonConverter';
import {useTheme} from "./ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
      <div className={`App ${theme}`}>
        <header>
          <p>
            XML to JSON Converter
          </p>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </header>
        <XmlToJsonConverter/>
      </div>
  );
}

export default App;
