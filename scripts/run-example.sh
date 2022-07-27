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

# echo "npx ts-node -P tsconfig.json $FILE"

npx ts-node -P tsconfig.json $FILE
