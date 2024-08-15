require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const { MongoClient, ServerApiVersion, MongoError  } = require('mongodb');

const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://jobtask-62cec.web.app",
    "https://server-side-mauve.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());

const uri = process.env.MongoDb_url;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const usersCollection = client.db('JobTask').collection('Product');
async function run() {
  try {
    // Connect the client to the server
    // await client.connect();
    console.log("Connected to MongoDB!");



    // Route to get users
    app.get('/users', async (req, res) => {
      try {
        // Get pagination parameters from query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit

        // Fetch users with pagination
        const cursor = usersCollection.find().skip(skip).limit(limit);
        const result = await cursor.toArray();

        // Get the total count of documents for pagination controls
        const total = await usersCollection.countDocuments();

        res.json({
          result,
          total,
          page,
          pages: Math.ceil(total / limit)
        });
      } catch (error) {
        res.status(500).send("Error fetching users");
      }
    });
    app.get('/user/last', async (req, res) => {
      const cursor = usersCollection.find().sort({ _id: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post('/product', async (req, res) => {
      try {
        // Validate the required fields
        const { product_name, product_image, price, ratings, description, date_posted, brand_name } = req.body;
        if (!product_name || !product_image || !price || !description || !brand_name || !ratings || !date_posted) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await usersCollection.insertOne(req.body);

        // Fetch the inserted document using the insertedId
        const insertedProduct = await usersCollection.findOne({ _id: result.insertedId });

        res.status(201).json({ message: 'Product added successfully', product: insertedProduct });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    });




    // Test the connection with a ping
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

run();

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
