/*
  What is this:
  This script is intended to help with sharing deployed test versions with those who need it (PMs). It does 3 things: 1) Runs build command 2) Grabs your branch name 3) Deploys the app to the S3 bucket with your branch as testing folder (e.g. https://alpha.blueraster.io/avenu/test/branchname/ )

  Caveats:
    * Make sure you are running this script in the intended directory on the intended branch
    * Make sure you got the right node version running for your app
    * Setup the global config based on your build and deploy scripts
    * Make sure you got AWS CLI configured because it uses it to push to S3 
*/

const cp = require('child_process');

const execSync = (...args) =>
  cp
    .execSync(...args)
    .toString()
    .trim();

// Set these globals up, friend.
const config = {
  bucket: 'alpha.blueraster.io/',
  directory: 'wcs/test/',
  projectDir: 'gfw-mapbuilder', //the name of the project folder on your machine
  buildCommand: 'npm run build', //switch to npm or whatever you use to run build command
  get awsS3Command() {
    return `aws s3 sync --acl public-read --include 'webpackBuild/' webpackBuild s3://${
      this.bucket
    }${this.directory}`; // you can edit this if you have different s3 sync setup
  }
};

//helper fn to copy output txt to clipboard
function pbcopy(data) {
  return new Promise(function(resolve, reject) {
    const proc = require('child_process').spawn('pbcopy');
    proc.on('error', function(err) {
      reject(err);
    });
    proc.on('close', function(err) {
      resolve();
    });
    proc.stdin.write(data);
    proc.stdin.end();
  });
}

function main() {
  //get the branch name
  const branchName = execSync("git branch | grep \\* | cut -d ' ' -f2");

  // let's check if all global variables are setup
  for (const prop in config) {
    if (config[prop] === null) {
      throw new Error(
        `You forgot to set up the global variable, friend. ${prop} is: ${
          config[prop]
        }`
      );
    }
  }

  // let's make sure we are in correct dir
  const currentDir = execSync('pwd');
  const regex = new RegExp(config.projectDir, 'gm');
  if (!currentDir.match(regex)) {
    console.log(`You are in ${currentDir}`);
    throw new Error(
      'Not in the intended directory. This script only works in the directory that you indicated as the _base_. Navigate to the intended directory and run it again'
    );
  }

  //check if directory is not empty
  if (
    config.directory === '' ||
    config.directory === null ||
    config.directory === '*'
  ) {
    throw new Error(
      'Wow there, looks like directory is empty, dont just nuke the whole bucket plz.'
    );
  }

  const deployCommand = `${config.buildCommand} && ${
    config.awsS3Command
  }${branchName}`;
  cp.execSync(deployCommand, { stdio: 'inherit' });
  const testURL = `https://${config.bucket}${config.directory}${branchName}/`;
  pbcopy(testURL).then(function() {
    console.log('URL Copied to clipboard');
  });
  execSync(`open -a "Google Chrome" ${testURL}`);
  return;
}

main();
