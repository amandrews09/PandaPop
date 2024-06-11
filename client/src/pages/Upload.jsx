import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE } from '../utils/mutations';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [uploadImage, { data, loading, error }] = useMutation(UPLOAD_IMAGE);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImageUpload = async () => {
    try {
      await uploadImage({ variables: { image } });
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Image upload failed!');
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {data && <p>Image URL: {data.uploadImage.url}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Upload;
