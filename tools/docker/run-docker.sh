#!/bin/bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

echo Running docker image for version $PACKAGE_VERSION

docker run --publish 16000:80 --detach --name rnf "remember-and-flip:${PACKAGE_VERSION}"

if [ $? -eq 0 ]
then
  echo Success!
else
  echo ERROR!
fi