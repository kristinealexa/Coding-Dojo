# HOW TO START EXAM
first create database using -- MONGODB
- click create on top left hand corner and begin to make new DB for exam
- username: kristinealexa
- password: root
- create user then use FAKE API
- 0.0.0.0/0
- finish and close then CONNECT!!!!
- click DRIVERS and then grab cluster name for exam!
    - example: "@cluster0.byeal6t.mongodb.net/" (this may change bc new db added)
    - now apply string to boilerplate for connection !!!

# SECOND STEP
make sure you make FOLDERS!!!!
- must create exam folder and within that create a SERVER & CLIENT folder
- then drag exam folder with SERVER & CLIENT folder inside to begin process!!!
    - COPY!!!! client folders from authors without nodemodules
    - COPY!!!! server folders from authors without nodemodules
- then open terminal
    - type ls to make sure youre looking into BOTH server and client
    - split terminal and add second terminal using bash
    - for SERVER~ terminal => cd server
    - ls to make sure your looking at package json
    - npm i to reinstall node modules
    - for CLIENT~ terminal => cd client
    - ls to make sure your looking at package json
    - npm i to reinstall node modules

# THIRD STEP BEFORE STARTING/RUNNING SERVER AND CLIENT
MAKE SURE YOU HAVE .ENV
- touch .env to make file INTO SERVER
- place following information inside 

        PORT=8000
        DB=db name
        ATLAS_USERNAME=kristinealexa
        ATLAS_PASSWORD=root

- then start server using => nodemon server.js
- start client using => npm start

# FOURTH STEP
-SWITCH everything from last project name to current one
    - example: change authors to current project name (might take awhile)
    - fix everything needed so once you start adding data it'll be easier
    -DOUBLE CHECK EVERYTHING IS FIXED FROM authors ~ new db name
- after doing that start adding data from wireframe to envoke delete/create button/show all/show one


# FINAL STEP
- make sure every route works, delete, edit, show all/show one
- make sure vaildations work
- make sure you include at least ONE css



# TERMINAL COMMANDS
CLIENT REACT
-npm install axios
-react-router-dom

SERVER
-npm install express mongoose dotenv cors


