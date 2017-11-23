const router = require("express").Router();
const Image = require("../models/Image");
const path = require("path");

router.get('/resized/list', (req, res) => {
  const img = new Image();

  img.list(function(status, payload){
    res.status(status).json(payload);
  });

});

router.get('/resized/:name', (req, res) => {
  const { name } = req.params;
  
  res.sendFile(`../../images/${name}`);

});

module.exports = router;