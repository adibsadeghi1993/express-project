require("dotenv").config();
const PORT = process.env.PORT;
const connectToMongoDB = require("./config/dbConection");

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(express.json());
connectToMongoDB();
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`app lisitining on port :${PORT}`);
});
