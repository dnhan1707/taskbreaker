import dotenv from 'dotenv';
import express from "express";
import fetch from "node-fetch"; // Import node-fetch
import user_prompt from "./prompt.js";
import cors from 'cors'; // Import CORS

const app = express();
const port = 6000;
const API_KEY = "7a488c20-bf18-47e7-b5b1-79706bf8b572-ce792aa4d58109b9"; // Your API key
const BASE_URL = 'https://llm.kindo.ai/v1/chat/completions'; // Kindo API URL

dotenv.config();

// Use CORS middleware
app.use(cors());

const prompt = user_prompt("Build a task managing web app using React in a week");

const data = {
  model: "azure/gpt-4o",
  messages: [{ role: "user", content: prompt }],
};

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/data", async (req, res) => {
  try {
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

    const responseData = await response.json(); // Parse JSON from the response
    // Send the content of the response back to the client
    const data = { message: responseData.choices[0].message.content};

    res.json(data)
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error making request to Kindo API');
  }
});

app.listen(port, () => {
  console.log("Server is listening on port:", port);
});
