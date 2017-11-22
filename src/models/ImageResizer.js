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

ImageResizer.prototype.saveImages = function(next) {
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
      
      if(error) {
        next(null);
      } else {
        next(updated);
      }

      db.close();
    });

  });
};

ImageResizer.prototype.getImage = function(url, index, next) {
  const request = axios(url, {
    responseType: "arraybuffer"
  });

  request
    .then(response => {
      //getImage's callback for async test
      next(response.data, index, url);

    })
    .catch(error => {
      //getImage's callback for async test
      next("");

    });
};

ImageResizer.prototype.resizeImages = function(imgString, index, originalUrl, next) {
  
  //Instantiate a Buffer using the response string
  let buffer = new Buffer(imgString, "binary");
  //Resizes all the images using sharp lib
  sharp(buffer)
    .resize(320, 240)
    .toBuffer((error, data, info) => {

      this._bufferArraySmall.push({binary: data, info, index, originalUrl, size: "small", url: `http://localhost:8585/images/resized/${`image${index}_small.jpg`}`});
      
      sharp(buffer)
        .resize(384, 288)
        .toBuffer((error, data, info) => {

          this._bufferArrayMedium.push({binary: data, info, index, originalUrl, size: "medium", url: `http://localhost:8585/images/resized/${`image${index}_medium.jpg`}`});

          sharp(buffer)
            .resize(640, 480)
            .toBuffer((error, data, info) => {

              this._bufferArrayLarge.push({binary: data, info, index, originalUrl, size: "large", url: `http://localhost:8585/images/resized/${`image${index}_large.jpg`}`});
              this._counter++;

              if ( this._counter === 10 ) {
                //resizeImages's callback for async test
                next(true);
                //Call saveImages with callback
                this.saveImages(function(updated){
                  //Finishes the chain, all done!
                });

              } else {
                //Didn't succeed resizing the images
                next(false);
              }

            });
        });

    });
  //Resizes all the images using sharp lib 
  sharp(buffer)
    .resize(320, 240)
    .toFile(`./images/image${index}_small.jpg`, (error, info) => {

      sharp(buffer)
        .resize(384, 288)
        .toFile(`./images/image${index}_medium.jpg`, (error, info) => {

          sharp(buffer)
            .resize(640, 480)
            .toFile(`./images/image${index}_large.jpg`, (error, info) => {

            });
        });

    });
};

module.exports = ImageResizer;
