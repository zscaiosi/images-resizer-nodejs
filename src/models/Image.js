const mongoDBClient = require("mongodb").MongoClient;
const mongo = require("../config/hosts.json");

function Image(){

}

Image.prototype.list = function(next){

  mongoDBClient.connect(mongo.mongoDb, (dbError, db) => {

    db.collection("resizedImages").findOne({ _id: "img13579" }, (findError, found) => {

      if( findError ) {
        next(500, { ok: false, result: null });
      } else {
        next(200, { ok: true, result: found });
      }
      db.close();
    });

  })

}

module.exports = Image;