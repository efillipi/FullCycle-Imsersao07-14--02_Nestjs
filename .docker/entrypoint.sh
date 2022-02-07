#!/bin/sh

if [ ! -f ".env" ]; then
   cp .env_example .env
fi

npm install

npm run start:dev
