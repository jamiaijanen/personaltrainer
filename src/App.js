import './App.css';
import React from 'react';
import Customers from './components/Customers'
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function App() {
  const [value, setValue] = React.useState('one')

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <div className="App">
      <AppBar position="static" color="inherit">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
          <Tab value="three" label="Calendar" />
          <Tab value="four" label="Statistics" />
        </Tabs>
      </AppBar>
      {value === 'one' && <Customers />}
      {value === 'two' && <Trainings />}
      {value === 'three' && <Calendar />}
      {value === 'four' && <Statistics />}
    </div>
  );
}

export default App;