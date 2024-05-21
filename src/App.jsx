import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [dicData, setDicData] = useState([]);
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchingData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`);
      if (!res.ok) {
        throw new Error("Word not found");
      }
      const data = await res.json();
      setDicData(data[0].meanings[0].definitions);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleClick = () => {
    if (word.trim()) {
      fetchingData();
      setWord("");
    } else {
      setError("Please enter a word");
    }
  };

  return (
    <div className='w-full min-h-screen p-7 flex flex-col items-center bg-gray-100'>
      <h1 className='text-3xl font-bold'>Dictionary App</h1>

      <div className='sm:w-[60%] min-h-24 rounded-lg shadow-md my-8 bg-white p-5 flex items-center'>
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)} placeholder='Enter a Word' className='border border-gray-300 outline-none rounded-l-lg p-3 flex-1' />
        <button onClick={handleClick} className='bg-violet-500 border border-violet-500 text-white p-3 sm:px-6 cursor-pointer font-semibold rounded-r-lg'>Search</button>
      </div>

      {loading && <p className='font-medium text-xl'>Loading...</p>}
      {error && <p className='text-red-500 text-md font-medium'>{error}</p>}

      {dicData.length > 0 && (
        <div className='sm:w-[60%] h-auto rounded-lg shadow-md bg-white p-1 flex flex-col items-center'>
          <ul style={{ listStyle: "circle" }} className='px-6 '>
            {dicData.map((item, index) => (
              <li key={index} className='text-lg my-3 font-semibold'>{item.definition}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
