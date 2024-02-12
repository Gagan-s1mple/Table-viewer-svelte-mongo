import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import xlsx from 'xlsx';


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Connection URL
const url = "mongodb://localhost:27017";
const dbName = "database_three";
const collectionName = "Sportsperson";

// Sample data in JSON format
const jsonData = [
  { name: "John", age: 25, city: "New York" },
  { name: "Jane", age: 30, city: "San Francisco" },
  { name: "Bob", age: 22, city: "Los Angeles" },
  // ... add more documents as needed
];

app.post("/insertData", async (req, res) => {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert multiple documents into the collection
    const result = await collection.insertMany(jsonData);

    res.status(200).json({ message: `${result.insertedCount} documents inserted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
