#!/usr/bin/env bash

git add .
git commit -m "$1"
git push origin master

npm version patch -m "Release version %s of the npm package."

git push
git push --tags

npm --access public publish
