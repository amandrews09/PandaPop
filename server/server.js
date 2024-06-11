const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Hardcoded Cloudinary configuration for testing
cloudinary.config({
  cloud_name: 'de3idooqb',
  api_key: '327697161541413',
  api_secret: 'vr8JDA3wFSkUOATz5eRzE13fI1g',
});

console.log('Cloudinary Config:', cloudinary.config());

const generateSignature = (timestamp) => {
  const stringToSign = `timestamp=${timestamp}&upload_preset=ml_default`;
  const signature = crypto
    .createHash('sha1')
    .update(stringToSign + cloudinary.config().api_secret)
    .digest('hex');
  
  return { timestamp, stringToSign, signature };
};

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false, limit: '10mb' }));
  app.use(express.json({ limit: '10mb' }));

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  // Cloudinary upload endpoint
  app.post('/upload', async (req, res) => {
    try {
      const fileStr = req.body.data;
      const timestamp = Math.round(new Date().getTime() / 1000);
      const { stringToSign, signature } = generateSignature(timestamp);

      console.log('Timestamp:', timestamp);
      console.log('String to Sign:', stringToSign);
      console.log('Signature:', signature);

      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'ml_default',
        timestamp,
        signature,
      });

      res.json({ url: uploadResponse.url });
    } catch (err) {
      console.error('Error uploading to Cloudinary:', err);
      res.status(500).json({ err: 'Something went wrong' });
    }
  });

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:3001/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
