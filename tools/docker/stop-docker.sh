#!/bin/bash

echo Stopping container

docker stop rnf --time 0

if [ $? -eq 0 ]
then
  echo Success!
else
  echo ERROR!
fi
