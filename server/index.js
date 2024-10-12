import express from "express";


const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send("Hello")
})


app.listen(port, (req, res) =>{
    console.log("server is listening on port: ", {port});
})
