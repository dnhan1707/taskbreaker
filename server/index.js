import express from "express";
import axios from "axios";
import user_prompt from "./prompt.js";

const app = express();
const port = 5000;
const API_KEY = "7a488c20-bf18-47e7-b5b1-79706bf8b572-ce792aa4d58109b9"; // Your API key
const BASE_URL = 'https://llm.kindo.ai/v1/chat/completions'; // Kindo API URL

const prompt = user_prompt("Build a task managing web app using React in a week");

const data = {
  model: "azure/gpt-4o",
  messages: [{ role: "user", content: prompt }],
  // max_tokens: 100, // Optional: Limit the response length
  // temperature: 0.7 // Optional: Control randomness in output
};

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/kindo", async (req, res) => {
  try {
    const response = await axios.post(BASE_URL, 
      data,
      {
        headers: {
          'api-key': API_KEY,
          'content-type': 'application/json'
        }
      }
    );
    
    // Log the response content to the console
    // console.log('Response:', response.data.choices[0].message.content);
    
    // Corrected line: Use res.status(200).json() to send JSON response
    res.status(200).json(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error making request to Kindo API');
  }
});

app.listen(port, () => {
  console.log("Server is listening on port:", port);
});
