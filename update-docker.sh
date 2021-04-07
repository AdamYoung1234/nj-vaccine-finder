#!/bin/bash

IFS=' '

CONTAINER_INFO=$(docker ps -a -f "name=nj-vaccine-finder" | grep "nj-vaccine-finder")
read -ra STRARR <<< "$CONTAINER_INFO"
CONTAINER_ID=${STRARR[0]}
docker container stop $CONTAINER_ID
docker container rm $CONTAINER_ID

IMAGE_INFO=$(docker images | grep "p1114501510/nj-vaccine-finder" )
read -ra STRARR <<< "$IMAGE_INFO"
IMAGE_ID=${STRARR[2]}
docker image rm $IMAGE_ID

docker run \
  --publish=3600:80 \
  --restart=always \
  --detach=true \
  --name=nj-vaccine-finder \
  p1114501510/nj-vaccine-finder:latest
