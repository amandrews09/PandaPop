// config.js
require('dotenv').config();

const config = {
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  port: process.env.PORT || 3001,
};

module.exports = config;