const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { authenticateToken, isStaff } = require('../middleware/authMiddleware');

// Upload image route - no multer needed
router.post('/upload', authenticateToken, async (req, res) => {
  try {
    // The image should be sent as a base64 string in the request body
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ message: 'No image data provided' });
    }

    // Upload directly to Cloudinary using base64
    const result = await cloudinary.uploader.upload(image, {
      folder: 'library_app',
      resource_type: 'image'
    });

    // Return the image URL and public_id
    res.status(200).json({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Delete image route
router.delete('/:publicId', authenticateToken, isStaff, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Remove the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return res.status(200).json({ message: 'Image deleted successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to delete image' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting file', error: error.message });
  }
});

module.exports = router;