import React,  { useState } from 'react';
import LoadCSV from './components/LoadCSV';
import DisplayCSV from './components/DisplayCSV';
import DownloadButton from './components/DownloadButton';
import AddAndSave from './components/AddAndSave';
import './App.css';
import './components/styles.css';

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    if (editIndex === index) {
      setEditIndex(null);
    } else {
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    setCsvData(csvData.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TCDB</h1>
        <a href="https://github.com/RobotClub-RyukyuUniv/TCDB"> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg> </a>
        <div className="container">
          <LoadCSV setCsvData={setCsvData} />
          <DownloadButton csvData={csvData} />
          <AddAndSave csvData={csvData} setCsvData={setCsvData} editIndex={editIndex} setEditIndex={setEditIndex} />
          <DisplayCSV csvData={csvData} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      </header>
    </div>
  );
};

export default App;
