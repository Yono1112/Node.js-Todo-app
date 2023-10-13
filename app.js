const express = require("express");
const app = express();
const PORT = 5001;
const taskRoute = require("./routes/tasks")

app.use("/api/v1/tasks", taskRoute)

app.listen(PORT, console.log("サーバーが起動しました"));