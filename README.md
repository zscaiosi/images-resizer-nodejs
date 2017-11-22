# images-resizer-nodejs
An example of getting images urls, retrieving those images, resizing it using "sharp" module, saving it to a remote MongoDB instance and serving all the resized images informations (and the image itself) through two endpoints. 

# NodeJS

NodeJS was chosen to be the implementation platform due to its various benefits, some:

- Has a single threaded event loop model wich has an outstanding performance in handling multiple clients requests and therefore being highly scalable.
- Has two great package managers "npm" and "yarn".
- The language being javascript reduces costs of projects, because the backend and frontend developer can be the same person without reducing code's quality.
- It runs on V8 JavaScript engine, therefore has portability.

# Setup process

- First of all you must install nodejs in your computer. https://nodejs.org/en/

- Make sure all the dependencies are installed, navigate to images-resizer-nodejs then:

` npm install `

- Then start the server (It runs on port 8585, thereby make sure there is no process using that port):

` npm start `

- For running tests:

` npm run test `