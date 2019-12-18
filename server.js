"use strict";
/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("COM4", { baudRate: 9600 });

const PORT = process.env.PORT || 3000;

const parser = new Readline();
port.pipe(parser);
parser.on("data", line => {
  convert(line);
  console.log(`> ${line}`);
});

//listen()/*メソッドを実行して3000番ポートで待ち受け。*/
process.env.NOW_REGION ? (module.exports = app) : app.listen(PORT);
console.log(`server runnning at ${PORT}`);

const startParser = () => {
  parser.on("data", line => convert(line));
};
exports.startParser = startParser;

let DataJson = 0;

let convert = function(line) {
  console.log(`> ${line}`);
  DataJson = {
    data: line
  };
};

//j_convertにあるjson形式の数値を参照して表示する
app.get("/api/v1", function(req, res, next) {
  res.json(DataJson);
});
