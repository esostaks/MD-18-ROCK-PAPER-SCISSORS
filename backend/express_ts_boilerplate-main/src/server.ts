import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'RockPaperScissors',
});

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/statistics', (req: Request, res: Response) => {
  pool.connect(function (err) {
      if (err) throw err;
      pool.query('SELECT * FROM matchHistory', function (err, result, fields) {
          if (err) throw err;
          res.send(result);
          console.log(result);
          });
  });
});


app.post('/statistics', (req: Request, res: Response) => {
  const computer = req.body.computer
  const player = req.body.player
  const winner = req.body.result
  const sqlInsert = 'INSERT INTO matchHistory (computerChoice, playerChoice, result) VALUES (?, ?, ?);'
  pool.query(sqlInsert, [computer, player, winner], (err, result) => {
  })
})
