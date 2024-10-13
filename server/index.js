import dotenv from 'dotenv';
import express from "express";
import fetch from "node-fetch"; // Import node-fetch
import cors from 'cors'; // Import CORS
// import dotenv from 'dotenv';
import user_prompt from "./prompt.js";

dotenv.config();

const app = express();
const port = 5000;
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
app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body; // Extract 'prompt' from the request body
    const ai_prompt = user_prompt(prompt)
    const data = {
      model: "azure/gpt-4o",
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

    res.json({ result }); // Send the result back to the front-end
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error making request to Kindo API');
  }
});

app.listen(port, () => {
  console.log("Server is listening on port:", port);
});
