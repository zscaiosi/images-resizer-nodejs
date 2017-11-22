const sharp = require("sharp");
const axios = require("axios");
const mongoDBClient = require("mongodb").MongoClient;
const mongo = require("../config/hosts.json");

function ImageResizer(originalUrl) {
  this._originalUrl = originalUrl;
  this._bufferArraySmall = [];
  this._bufferArrayMedium = [];
  this._bufferArrayLarge = [];
  this._counter = 0;
}

ImageResizer.prototype.getImagesArray = function(next) {
  const request = axios(this._originalUrl);

  request
    .then(response => {
      const urlsArray = response.data.images;
      //Callback function next();
      next(urlsArray);
    })
    .catch(error => {
      next(null);
    });
};

ImageResizer.prototype.saveImages = function() {
  //Opens MongoDB connection
  mongoDBClient.connect(mongo.mongoDb, (dbError, db) => {
    //Updates collection with new arrays
    db.collection("resizedImages").findOneAndUpdate({ _id: "img13579" }, 
    {
      $set: {
        smallImages: this._bufferArraySmall,
        mediumImages: this._bufferArrayMedium,
        largeImages: this._bufferArrayLarge
      }
    },
    (error, updated) => {
      db.close();
    });

  });
};

ImageResizer.prototype.getImage = function(url, index) {
  const request = axios(url, {
    responseType: "arraybuffer"
  });

  request
    .then(response => {
      this.resizeImages(response.data, index, url);
    })
    .catch(error => {
      console.log("ERRO:", error);
    });
};

ImageResizer.prototype.resizeImages = function(imgString, index, originalUrl) {
  
  //Instantiate a Buffer using the response string
  let buffer = new Buffer(imgString, "binary");
  //Resizes all the images to small size using sharp lib
  sharp(buffer)
    .resize(320, 240)
    .toBuffer((error, data, info) => {

      this._bufferArraySmall.push({data, info, index, size: "small"});
      
      sharp(buffer)
        .resize(384, 288)
        .toBuffer((error, data, info) => {

          this._bufferArrayMedium.push({data, info, index, size: "medium"});

          sharp(buffer)
            .resize(640, 480)
            .toBuffer((error, data, info) => {

              this._bufferArrayLarge.push({data, info, index, size: "large"});
              this._counter++;
              
              this._counter === 10 ? this.saveImages() : null;
            });
        });

    });
};

module.exports = ImageResizer;
