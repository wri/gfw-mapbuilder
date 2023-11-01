# Creating a New Dataset and Layer or updating a Existing Dataset and Layer for the Resource Watch API

These files will allow you to create and update Resource Watch API datasets and layers using Node.js. Please refer to https://resource-watch.github.io/doc-api/reference.html and https://github.com/wri/gfw-mapbuilder/wiki when creating your Datasets and Layers.

## Prerequisites

- Node.js installed on your machine
- Update the .env file with your Resource Watch API token

## Node Installation

1. Visit the official Node.js website at [https://nodejs.org](https://nodejs.org).
2. On the homepage, you will see two versions available for download: LTS (Long-Term Support) and Current.
   - If you want the most stable and widely-used version, choose the LTS version.
   - If you want the latest features and don't mind occasional updates, choose the Current version.
3. Click on the version you prefer, and the download should start automatically based on your operating system.
4. Once the download is complete, run the installer and follow the instructions provided.
5. During the installation process, you may be prompted to choose additional components or customize the installation. You can generally leave the default options selected unless you have specific requirements.
6. After the installation is complete, you can verify that Node.js is install

## Usage

1. Create a new dataset and layer:

   - Open `createDataset_Layer.js` file
   - Modify the config.json to create a new dataset and layer according to your requirements
   - Run the script: `node createDataset_Layer.js`

2. Update a new dataset and layer:
   - Open `updateDataset_Layer.js` file
   - Modify the config.json to create a new dataset and layer according to your requirements
   - Run the script: `node updateDataset_Layer.js`
