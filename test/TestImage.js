const expect = require("chai").expect;
const Image = require("../src/models/Image");
//Instantiates Image
const img = new Image();

//Describes the whole Image class' tests
describe("Image", function(){

  describe("list()", function(){
    //Set mocha's async timeout 
    this.timeout(5000);

    it("Should return status 200 OK", function(done){

      img.list(function(status, json){

        expect(status).to.equal(200);
        //When callback function is executed, finishes the test
        done();

      });

    });

  });

});