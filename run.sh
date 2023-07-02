#!/bin/sh
# Start project in Docker containers using default ports
clear
# Move mock estate pictures
cd ./back
mkdir -p ./dist/upload/estatePictures
cp ./mockEstatePictures/* ./dist/upload/estatePictures
cd ../
cd front/
npm i
cd ../back/
npm i
cd ../
clear
docker-compose up --build