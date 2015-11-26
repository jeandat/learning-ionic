#!/bin/sh

npm i
grunt
ionic platform add ios
ionic platform add android
ionic platform add browser
ionic browser add crosswalk