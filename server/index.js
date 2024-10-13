import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// CRUD Operations
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

