const expect = require("chai").expect;
const ImageResizer = require("../src/models/ImageResizer");

let imgResizer = new ImageResizer("http://54.152.221.29/images.json");

describe("ImageResizer", function(){

  describe("getImages()", function(){
    //Set mocha's async timeout 
    this.timeout(5000);
  
    it("Should get an array of images urls", function(done){
  
      imgResizer.getImagesArray(function(json){
        //Expect assertion checks if array exists
        expect(json).to.be.an('array');
        //When callback function is executed, finishes the test
        done();
//Describing getImages()
        describe("getImage()", function(){
          //Set mocha's async timeout 
          this.timeout(5000);
          
          it("Should get a string containing the image epresentation", function(done){
      
            imgResizer.getImage("http://54.152.221.29/images/b737_5.jpg", 33, function(response){
              //Expects a string
              expect(response).to.be.a('string');
      
              done();
//Describing resizeImages()
              describe("resizeImages()", function(){
                //Set mocha's async timeout 
                this.timeout(5000);
            
                it("Should get a boolean telling us if succeeded or not", function(done){
            
                  imgResizer.resizeImages(response, 33, "http://54.152.221.29/images/b737_5.jpg", function(isOk){
                    //Expects a boolean
                    expect(isOk).to.be.a('boolean');
            
                    done();
//Describing saveImages()
                    describe("saveImages()", function(){
                      //Set mocha's async timeout 
                      this.timeout(5000);
                      
                      it("Should get a JSON with the updated document", function(done){

                        imgResizer.saveImages(function(updated){
                          //Expects a boolean
                          expect(updated).to.be.an('object');

                          done();

                        });

                      });

                    });

                  });
            
                });
            
              });
      
            });
      
          });
          
        });

      });
  
    });
  
  });  

});