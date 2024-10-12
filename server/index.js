import express from "express";


// const kindoAI = "adeed805-0109-443d-af0e-e92110d48064-6852abcdf3bd2178"
const app = express();
const port = 5000;
// const kindo = new Kindo(apikey)

app.get("/", (req, res) => {
    res.send("Hello")
})


app.listen(port, (req, res) =>{
    console.log("server is listening on port: ", {port});
})
