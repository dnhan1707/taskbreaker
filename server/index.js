import dotenv from 'dotenv';
import express from "express";
import fetch from "node-fetch"; // Import node-fetch
import cors from 'cors'; // Import CORS
// import dotenv from 'dotenv';
import user_prompt from "./prompt.js";
import getMembersTasks from './getDataDashboard.js';

import insertTasks from './InsertTasks.js';

dotenv.config();

const app = express();
const port = 8080;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.log("No API key found");
}

const BASE_URL = 'https://llm.kindo.ai/v1/chat/completions'; // Kindo API URL

dotenv.config();

// Use CORS middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Change the route to POST
app.post("/kion", async (req, res) => {
  try {
    const { prompt, is_regenerating } = req.body; // Extract 'prompt' from the request body
    const ai_prompt = await user_prompt(prompt, is_regenerating)
    // console.log(ai_prompt);
    const data = {
      model: "azure/gpt-4-turbo",
      messages: [{ role: "user", content: ai_prompt }], // Use the prompt received from the client
    };

    // Make a POST request to the Kindo API
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Stringify the data to send in the request body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const result = responseData.choices[0].message.content; // Extract the response content
    // console.log(result)

    res.json({ result }); // Send the result back to the front-end
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error making request to Kindo API');
  }
});


// POST endpoint to receive result
// Backend route in index.js or your backend server file
app.post('/tasks', async (req, res) => {
    try {
        console.log("Received task data:", req.body); // Log incoming data
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data provided" });
        }
        await insertTasks(req.body); // Insert tasks into Firestore

        res.status(201).json({ message: 'Tasks added successfully' });
    } catch (error) {
        console.error('Error in /tasks route:', error); // Log the full error
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/all_tasks", async (req, res) => {
  try {
      const allTasks = await getMembersTasks();
      // console.log(allTasks); // Log to verify data is returned correctly
      res.json(allTasks); // Send tasks directly as JSON
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error fetching tasks from Firestore');
  }
});

app.listen(port, () => {
  console.log("Server is listening on port:", port);
});
