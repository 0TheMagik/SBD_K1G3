import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ onImageUpload, currentImage = null, className = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage);

  // Function to resize and compress image
  const resizeAndCompressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          // Calculate new dimensions (max width/height of 800px)
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;
          
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
          
          // Create canvas and resize image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get as base64 string with reduced quality (0.7)
          const base64String = canvas.toDataURL('image/jpeg', 0.7);
          resolve(base64String);
        };
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Only .jpeg, .jpg and .png files are allowed!');
      return;
    }

    try {
      setError('');
      setUploading(true);
      
      // Create a preview
      setPreview(URL.createObjectURL(file));
      
      // Resize and compress the image
      const compressedImage = await resizeAndCompressImage(file);
      
      // Get token
      const token = localStorage.getItem('token');
      
      // Upload the image
      const response = await axios.post(
        'http://localhost:3000/api/upload/upload',
        { image: compressedImage },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Call the callback with the image URL and public_id
      onImageUpload({
        url: response.data.url,
        publicId: response.data.publicId
      });
    } catch (err) {
      console.error('Upload error:', err);
      let errorMessage = 'Error uploading image';
      
      if (err.response?.status === 413) {
        errorMessage = 'Image is too large. Please use a smaller image.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
      // Reset preview if upload fails
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`image-uploader ${className}`}>
      {preview && (
        <div className="mb-3">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-40 object-cover rounded border"
          />
        </div>
      )}
      
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600"></div>
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500 mb-1">{preview ? 'Change image' : 'Click to upload image'}</p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;