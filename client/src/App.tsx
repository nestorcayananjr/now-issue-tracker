import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const testRequest = () => {
    axios.get('/api')
      .then(res => console.log(res.data))
      .catch(err => console.error('ERROR:', err.response?.status, err.response?.data));
  };


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => testRequest()}>Click</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
