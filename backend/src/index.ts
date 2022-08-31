import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import db from "./models";
import * as items from "./controllers/item.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

var router = require("express").Router();

router.post("/", items.create);
router.get("/", items.findAll);
router.get("/refresh", items.refreshAll)
router.delete("/", items.deleteAll);
app.use('/api/', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}/api/`);
});