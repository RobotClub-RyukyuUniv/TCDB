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
  const [fieldnames, setFieldnames] = useState([]);

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
        <h1>Welcome to TCDB </h1>
        <LoadCSV setCsvData={setCsvData} setFieldnames={setFieldnames} />
        <DownloadButton csvData={csvData} /> 
      </header>

      <body className='App-body'>
      <div className="container">
          <AddAndSave csvData={csvData} setCsvData={setCsvData} editIndex={editIndex} setEditIndex={setEditIndex} fieldnames={fieldnames} />
          <DisplayCSV csvData={csvData} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      </body>
    </div>
  );
};

export default App;
