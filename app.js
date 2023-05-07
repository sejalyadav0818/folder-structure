const express = require("express");
const middleware = require("./middleware/middleware");
const app = express();
const PORT = process.env.PORT || 5000;
const middl = require("./middleware/middleware");
const product_routes = require("./routes/products");

//middleware
app.use("/api/products", product_routes);

app.get("/", middl, (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`${PORT} yes i am alive`);
});
