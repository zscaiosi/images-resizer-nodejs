const config = require('./config/config');
const ImageResizer = require("./models/ImageResizer");
const app = config();

let imgResizer = new ImageResizer("http://54.152.221.29/images.json");
//Get the JSON containing the array
imgResizer.getImagesArray(function(array){
//Then as callback maps the array and calls .getImage() for each of them
  array.map( (jsonUrl, index) => {

    imgResizer.getImage(jsonUrl.url, index);

  });
});

app.listen('8585', () => {
  console.log("Listening to 8585");
});