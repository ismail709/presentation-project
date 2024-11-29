import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch images from the backend when the app loads
  useEffect(() => {
    axios.get('http://localhost:5000/images')
      .then((response) => setImages(response.data))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages([...images, response.data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Photo Gallery</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div className="image-grid">
        

        
        {images.map((image) => (
          <div key={image} className="image-container"><img src={`http://localhost:5000/uploads/${image}`} alt="User Upload" /></div>
        ))}
      </div>
    </div>
  );
};

export default App;
