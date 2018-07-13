#!/bin/bash

# colors for logging messages
red='\033[91m'
green='\033[92m'
yellow='\033[93m'
endColor='\033[0m'

# logs a message
# first argument is the color
# second argument is the message
logMessage () {
  echo -e "${1}${2}${endColor}\n";
}

# gets a property from a json file
# this is pretty limited since we only need the version from the package.json
# if we ever need to get nested properties or array values
# from a json file we will use jq (https://stedolan.github.io/jq/)
getJsonProperty () {
  echo `grep -m 1 "${2}" $1 | sed -E 's/^ *//;s/.*: *"//;s/",?//g'`;
}

# Make sure we are on the develop branch before doing anything
branch=$(git rev-parse --abbrev-ref HEAD)

if [[ $branch != "develop" ]]; then
  logMessage $red "This script must be run from the develop branch. Exiting..."
  exit
fi

# Check if there are changes on the branch. We don't want to bring them over to gh-pages
if ! git diff-index --quiet HEAD --; then
  logMessage $red "This branch has un-comitted changes. Stash or commit them and try again"
  exit
fi

# argument provided to script
versionBumpType=$1

# check if the argument provided is acceptable
# it must not be empty and must be one of 'major', 'minor', 'patch'
if [[ -z $versionBumpType ]] || ([[ $versionBumpType != "major" ]] && [[ $versionBumpType != "minor" ]] && [[ $versionBumpType != "patch" ]]); then
  logMessage $red "version bump type not found or not allowed. This should be one of 'patch', 'minor', 'major'. Exiting...";
  exit
fi

# update the package version
logMessage $yellow "UPDATING PACKAGE VERSION - ${versionBumpType} bump"

npm version $versionBumpType
if [ $? != 0 ]; then
  logMessage $red "Version bump failed. Exiting..."
  exit
fi

# run the build script
logMessage $yellow "BUILDING APPLICATION..."

npm run build
if [ $? != 0 ]; then
  logMessage $red "Build failed. Exiting..."
  exit
fi

# get new version number from package json
version=$(getJsonProperty ./package.json "version")

logMessage $green $version

# if no version there was an issue with the package.json
if [[ ! $version ]]; then
  logMessage $red "no version number found, check that your package.json exists in this folder. Exiting...";
  exit;
fi

# checkout the gh-pages branch
logMessage $yellow "CHECKING OUT GH-PAGES BRANCH..."

git checkout gh-pages

# move the files we need to update
logMessage $yellow "MOVING ASSETS..."

cd webpackBuild && cp -R resources.js index.html report.html css js ../ && cd .. &&

# add and commit the changed files
git add .

logMessage $yellow "COMMITING CHANGES..."

git commit -m "updating to version $version"

# push to remote gh-pages branch (this updates the production site)
logMessage $yellow "PUSHING CHANGES TO REMOTE..."

git push origin gh-pages

# checkout back to the previous branch
logMessage $yellow "CHECKING OUT PREVIOUS BRANCH"

git checkout -
