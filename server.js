"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const parser = new Readline();
const port = new SerialPort("/dev/cu.URT0");
port.pipe(parser);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    "Expressサーバーがポート%dで起動しました。モード:%s",
    PORT,
    app.settings.env
  );
});

parser.on("data", line => {
  convert(line);
  console.log(`> ${line}`);
});

let DataJson = 0;

let convert = line => {
  console.log(`> ${line}`);
  DataJson = {
    data: line
  };
};

app.get("/", (req, res) => {
  res.json(DataJson);
});
