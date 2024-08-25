import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError('');
      const res = await axios.post('http://localhost:3000/bfhl', parsedJson);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input. Please try again.');
    }
  };

  const handleOptionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <strong>Alphabets:</strong> {response.alphabets.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <strong>Numbers:</strong> {response.numbers.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <strong>Highest Lowercase Alphabet:</strong> {response.highest_lowercase_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder='Enter JSON, e.g., { "data": ["A", "C", "z"] }'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <select multiple onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <div>
            {renderResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
