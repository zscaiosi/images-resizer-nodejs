const mongoDBClient = require("mongodb").MongoClient;
const mongo = require("../config/hosts.json");

function Image(){

}

Image.prototype.list = function(next){

  mongoDBClient.connect(mongo.mongoDb, (dbError, db) => {

    db.collection("resizedImages").findOne({ _id: "img13579" }, (findError, found) => {

      if( findError ) {
        next(null);
      } else {
        console.log(found);
        next(200, { ok: true, result: found });
      }

    });

  })

}