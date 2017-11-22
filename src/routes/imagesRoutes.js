const router = require("express").Router();
const ImageResizer = require("../models/ImageResizer");

router.get('/resized/search', (req, res) => {
  const img = new ImageResizer("http://54.152.221.29/images.json");

  img.getImage(function(image){
    res.status(200).send(image);
  });

});

module.exports = router;