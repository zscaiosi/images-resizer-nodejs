const expect = require("chai").expect;
const ImageResizer = require("../src/models/ImageResizer");

let imgResizer = new ImageResizer("http://54.152.221.29/images.json");

describe("ImageResizer", function(){
  describe("getImages()", function(){
    //Set mocha's async timeout 
    this.timeout(5000);
  
    it("Should GET the JSON containing images key", function(done){
  
      imgResizer.getImagesArray(function(json){
        //Expect assertion checks if variable exists
        expect(json).to.have.property('images');
        //When callback function is executed, finishes the test
        done();
      });
  
    });
  
  });  
});