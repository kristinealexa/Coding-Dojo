const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8000;

require('dotenv').config();

require("./config/config");


app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors())

const AllMyProductRoutes = require("./routes/product.routes");
AllMyProductRoutes(app);


// const dbName = process.env.DB;
// const username = process.env.ATLAS_USERNAME;
// const pw = process.env.ATLAS_PASSWORD;
// // mongodb+srv://kristinealexa:<password>@cluster0.mna30zv.mongodb.net/?retryWrites=true&w=majority
// const uri = `mongodb+srv://${username}:${pw}@cluster0.mna30zv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// mongoose.connect(uri)
//     .then(() => console.log("🥳🥳🥳🥳 Established a connection to the database"))
//     .catch(err => console.log("🧐🧐🧐🧐 Something went wrong when connecting to the database", err));


app.listen( port, () => console.log(`🥳🥳🥳🥳Listening on port: ${port}`) );

// 100% COPY PASTE BOILER PLATE!!!!!