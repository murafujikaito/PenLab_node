"use strict";
var express = require("express");
var app = express();

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const parser = new Readline();
const port = new SerialPort("COM4", { baudRate: 9600 });
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
