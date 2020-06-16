const express = require("express");
const app = express();

app.get("/", (req, res) => {
     res.json({ msg: "<h1>Hello World!</h2>"});
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));