const express = require('express');
const app = express();
const cors = require("cors");

// Add config make sure route is connected properly
require("../server/configs/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

// // add routes
// const Routes = require("./routes/author.routes")
// Routes(app)

app.listen(8000, () => console.log("The server is listening on port 8000"));