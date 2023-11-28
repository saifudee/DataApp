import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./database.js";

const app = express();
const port =process.env.PORT || 5000;

/* To handle the HTTP Methods Body Parser is used, Generally used to extract the entire body portion of an incoming request stream and exposes it on req.body
 */

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json(database);
});

app.put("/add", (req, res) => {
    const { name, age,email, country } = req.body;

    if (database.length === 0) {
        database.push({
          id: 1,
          name,
          age,
          email,
          country,
        });
      } else {
        database.push({
          id: database[database.length - 1].id + 1,
          name,
          age,
          email,
          country,
        });
      }
  try {
    res.status(200).json(database);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.delete("/remove/:id", (req, res) => {
    const idToRemove = parseInt(req.params.id);
    const indexToRemove = database.findIndex(item => item.id === idToRemove);
      if (indexToRemove !== -1) {
      database.splice(indexToRemove, 1);
      try {
        res.status(200).json(database);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  });
  

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
