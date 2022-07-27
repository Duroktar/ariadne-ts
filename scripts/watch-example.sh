#!/usr/bin/env bash

if [ ! $1 ]; then
    echo "Must pass example name."
    exit 1
fi

FILE=examples/$1.ts

if [ ! -f "$FILE" ]; then
    echo "$FILE does not exist."
    exit 1
fi

# echo "npx nodemon --config nodemon.json $FILE"

npx nodemon --config nodemon.json $FILE
