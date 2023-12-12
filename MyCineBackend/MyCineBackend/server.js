const express = require("express");
const app = express();
const filmRoutes = require("./routes/filmRoutes");

const cors = require("cors");



app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.json({ message: "Welcome to MyCine backend." });
});
app.use('/api', filmRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});