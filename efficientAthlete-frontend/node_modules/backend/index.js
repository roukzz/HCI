const connectDB = require("./dbConnection/connection");

const app = require("./server");

connectDB();

const port = 8000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
