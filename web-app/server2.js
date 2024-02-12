import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import xlsx from 'xlsx';

const app = express();
const port = 3001;

// Update the MongoDB connection string
const mongoUri = 'mongodb://localhost:27017/database_two';
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

// Read data from Excel file and load into the MongoDB database
// Change your /loadData endpoint to accept tableName as a query parameter
app.get('/loadData', async (req, res) => {
  try {
    const tableName = req.query.tableName; // Extract tableName from the request query
    const database = client.db();
    
    // Ensure the collection exists, create it if it doesn't
    const collections = await database.listCollections().toArray();
    if (!collections.some((col) => col.name === tableName)) {
      await database.createCollection(tableName);
    }

    const collection = database.collection(tableName);

    // Read data from Excel file (assuming it has a sheet named 'Sheet1')
    const excelFile = xlsx.readFile("C:/Users/gagan/Downloads/sampledatawinterathletes/sampledatawinterathletes.xlsx");
    const sheetData = xlsx.utils.sheet_to_json(excelFile.Sheets['Sheet1']);

    // Insert data into the MongoDB collection
    const insertResult = await collection.insertMany(sheetData);

    res.json({ message: `${insertResult.insertedCount} documents inserted into MongoDB` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
process.on('SIGINT', async () => {
  await closeMongoDBConnection();
  process.exit(0);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

