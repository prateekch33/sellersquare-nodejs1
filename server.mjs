import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import connect from "./db.mjs";
import cheerio from "cheerio";
import axios from "axios";
import countries from "./countries.mjs";
const app = express();
app.use(bodyParser.json());
connect();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is running!!");
});
app.post("/webscrap", async (req, res) => {
  let { data } = await axios.get(
    "https://www.britannica.com/topic/list-of-countries-1993160"
  );
  const $ = cheerio.load(data);
  const listItems = $(".topic-list li div a");
  listItems.each(async (idx, el) => {
    let data = new countries({
      countryName: $(el).text(),
    });
    await data
      .save()
      .then(() => {
        console.log("Data Uploaded");
      })
      .catch((err) => {
        return res.status(400).send(err.message);
      });
  });
  return res.status(200).send("Scrapping Done");
});

app.get("/alldata", async (req, res) => {
  await countries
    .find({})
    .then((result) => {
      return res.status(200).json({ status: 0, data: result });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
