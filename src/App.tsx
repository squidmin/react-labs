import React from 'react';
import XmlToJsonConverter from './components/XmlToJsonConverter';
import {useTheme} from "./ThemeContext";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  return (
      <div className={`App ${theme}`}>
        <header>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
            label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
          />
        </header>
        <XmlToJsonConverter/>
      </div>
  );
}

export default App;
