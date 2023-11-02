/**
 * This script creates a new dataset and a new layer the Resource Watch API v1.
 * It requires an authorization token to access the API and the authorization token must be stored in an .env file.
 * update the config.js file with the dataset and layer details.
 */

const axios = require('axios');
const config = require('./config');
const env = require('dotenv').config();

const DATA_API_TOKEN = process.env.DATA_API_TOKEN;
const DATASET_ID = 'c6c03ce0-4987-4821-a792-85ff81a49d1f';

async function createNewDataset() {
  const url = 'https://api.resourcewatch.org/v1/dataset';
  const body = config.datasetBody;
  const headers = config.header;

  headers.Authorization = `Bearer ${DATA_API_TOKEN}`;

  try {
    const response = await axios.post(url, body, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function createNewLayer() {
  const url = `https://api.resourcewatch.org/v1/dataset/${DATASET_ID}/layer`;
  const body = config.layerBody;
  const headers = config.header;

  body.dataset = DATASET_ID;
  headers.Authorization = `Bearer ${DATA_API_TOKEN}`;

  try {
    const response = await axios.post(url, body, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
// 1. Create a new dataset
// createNewDataset();
// 2. comment out createNewDataset() and run createNewLayer() to create a new layer
createNewLayer();
