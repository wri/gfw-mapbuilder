/**
 * This script updates a new dataset and a new layer the Resource Watch API v1.
 * It requires an authorization token to access the API and the authorization token must be stored in an .env file.
 * update the config.js file with the dataset and layer details.
 */

const axios = require('axios');
const config = require('./config');
const env = require('dotenv').config();

const DATA_API_TOKEN = process.env.DATA_API_TOKEN;
const DATASET_ID = 'efdc1e33-87c9-44f5-aba2-ef71ae3c2e79';
const LAYER_ID = 'a2d9e60f-b4f6-4e56-8100-00fb3da2cf8e';

async function updateDataset() {
  const url = `https://api.resourcewatch.org/v1/dataset/${DATASET_ID}`;
  const body = config.datasetBody.dataset;
  const headers = config.header;

  headers.Authorization = `Bearer ${DATA_API_TOKEN}`;

  try {
    const response = await axios.patch(url, body, { headers });
    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

async function updateLayer() {
  const url = `https://api.resourcewatch.org/dataset/${DATASET_ID}/layer/${LAYER_ID}`;
  const body = config.layerBody;
  const headers = config.header;

  body.dataset = DATASET_ID;
  headers.Authorization = `Bearer ${DATA_API_TOKEN}`;

  try {
    const response = await axios.patch(url, body, { headers });
    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}
// 1. Create a new dataset
// updateDataset();
// 2. comment out createNewDataset() and run createNewLayer() to create a new layer
updateLayer();
