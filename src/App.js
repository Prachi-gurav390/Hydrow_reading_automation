import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [uniqueId, setUniqueId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleButtonClick = () => {
    const id = prompt('Please enter a unique ID:');
    if (id) {
      setUniqueId(id);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!uniqueId || !imageFile) {
      alert('Please provide both unique ID and image.');
      return;
    }

    const formData = new FormData();
    formData.append('unique_id', uniqueId);
    formData.append('image', imageFile);

    setLoading(true);

    try {
      const res = await axios.post('http://3.109.73.189/upload', formData);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      alert('An error occurred while uploading.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      {!uniqueId ? (
        <button onClick={handleButtonClick}>Start Process</button>
      ) : (
        <>
          <p>Unique ID: {uniqueId}</p>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <br /><br />
          <button onClick={handleSubmit}>Upload Image</button>
        </>
      )}
      {loading && <p>Loading...</p>}
      {response && (
        <div>
          <h3>Server Response:</h3>
          <p>{response.message}</p>
          <p>Random Number: {response.random_number}</p>
        </div>
      )}
    </div>
  );
}

export default App;
