const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
const images = require("../routes/imagesRoutes");

module.exports = function(){
  let app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/images", images);
  
  return app;
}