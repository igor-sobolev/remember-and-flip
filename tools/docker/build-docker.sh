#!/bin/bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

echo Building docker image for version $PACKAGE_VERSION

docker build --tag "remember-and-flip:${PACKAGE_VERSION}" -f ./tools/docker/Dockerfile .

if [ $? -eq 0 ]
then
  echo Docker image is built!
else
  echo ERROR!
fi