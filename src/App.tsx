import React from 'react';
import {useTheme} from "./ThemeContext";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {TestApp1} from "./components/TestApp1";

function App() {
  const {theme, toggleTheme} = useTheme();
  const isDarkMode = theme === 'dark';
  return (
    <div className={`App ${theme}`}>
      <header>
        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={toggleTheme}/>}
          label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
        />
      </header>
      {/*<XmlToJsonConverter/>*/}
      <TestApp1/>
    </div>
  );
}

export default App;
