import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3001;

// Update the MongoDB connection string
const mongoUri = 'mongodb://localhost:27017/database_one';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectToMongoDB();

app.use(cors());

app.get('/tables', async (req, res) => {
  try {
    const database = client.db();
    const collections = await database.listCollections().toArray();
    const tables = collections.map(collection => collection.name);
    res.json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/columns/:tableName', async (req, res) => {
  const { tableName } = req.params;
  try {
    const database = client.db();
    const collection = database.collection(tableName);
    const keys = Object.keys(await collection.findOne({}));
    res.json(keys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/:tableName', async (req, res) => {
  const { tableName } = req.params;
  try {
    const database = client.db();
    const collection = database.collection(tableName);
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

