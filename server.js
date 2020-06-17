const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

//init Middleware
app.use(express.json())


app.get("/", (req, res) => {
     res.json({ msg: "<h1>Hello World!</h2>"});
})

//routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));