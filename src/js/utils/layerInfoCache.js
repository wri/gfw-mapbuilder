/**
* Cache for information about each layer, to be shown in the modal
*/
import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';
import {urls} from 'js/config';

const _cache = {};

/**
* Fetch the metadata from GFW's Metadata API
* @param {string} url - api url plus technical name, e.g. urls.metadataApi + '/tree_cover_loss'
* @return {Deferred} promise
*/
function getMetadataTask (url) {
  const promise = new Deferred();
  const request = new XMLHttpRequest();
  request.addEventListener('load', () => {
    promise.resolve(JSON.parse(request.response));
  });
  request.open('GET', url);
  request.send();
  return promise;
}

/**
* Fetch the metadata from the Carto API
* @param {string} url - api url plus technical name, e.g. urls.metadataApi + '/tree_cover_loss'
* @return {Deferred} promise
*/
// function getCartoMetadata (url) {
//   const promise = new Deferred();
//   debugger;
//   const request = new XMLHttpRequest();
//   request.addEventListener('load', () => {
//     promise.resolve(JSON.parse(request.response));
//   });
//   request.open('GET', url);
//   request.setRequestHeader( 'Access-Control-Allow-Origin', '*');
//   request.send();
//   return promise;
// }

const getCartoMetadata = (unique => url =>
  new Promise(rs => {
    const script = document.createElement('script');
    const name = `_jsonp_${unique++}`;

    if (url.match(/\?/)) {
      url += `&callback=${name}`;
    } else {
      url += `?callback=${name}`;
    }

    script.src = url;
    window[name] = json => {
      rs(JSON.stringify(json));
      script.remove();
      delete window[name];
    };

    document.body.appendChild(script);
  })
)(0);

/**
* Fetch the metadata from ArcGIS Online via the item Id
* @param {string} url - Url includes the item id and refers to ArcGIS Online sharing url, urls.metadataXmlEndpoint(layer.itemId)
* @return {Deferred} promise
*/
function getXMLTask (url) {
  return esriRequest({
    url,
    handleAs: 'xml',
    callbackParamName: 'callback'
  });
}

/**
* Fetch the metadata from ArcGIS MapService, this is the last resort
* @param {string} url - Map Service URL
* @return {Deferred} promise
*/
function getServiceInfoTask (url) {
  return esriRequest({
    url,
    handleAs: 'json',
    content: {f: 'json'},
    callbackParamName: 'callback'
  });
}

function reduceCarto (rawResults) {
  const results = {};
  const {name, license, title, related_tables, tags} = rawResults;
  if(name) { results.name = name; }
  if(license) { results.license = name; }
  if(title) { results.title = title; }
  if (related_tables[0].synchronization.url) { results.download_data = related_tables[0].synchronization.url; }
  if (tags) {
    const keywords = [];
    for (let i = 0; i < tags.length; i++) {
      keywords.push(tags[i]);
    }
    results.tags = keywords.join(', ');
  }
  if(related_tables) {
    const layerNames = [];
    for (let i = 0; i < related_tables.length; i++) {
      layerNames.push(related_tables[i].name);
    }
    results.layerNames = layerNames;
  }
  return results;
}

/**
* Reduce the xml document to the desired JSON format
* @param {document} xmlDoc - xml document to parse
* @return {object} result
* @return {string} result.title
* @return {string} result.subtitle
* @return {string} result.cautions
* @return {string} result.overview
* @return {string} result.citation
* @return {string} result.source
* @return {string} result.other
* @return {string} result.function
* @return {string} result.download_data
* @return {string} result.tags
* @return {string} result.learn_more
* @return {string} result.frequency_of_updates
* @return {string} result.geographic_coverage
* @return {string} result.license
* @return {string} result.date_of_content
* @return {string} result.resolution
*/
function reduceXML (xmlDoc) {
  const result = {};
  const title = xmlDoc.querySelector('resTitle'),
        subtitle = xmlDoc.querySelector('resAltTitle'),
        learn_more = xmlDoc.querySelectorAll('citOnlineRes linkage'),
        citation = xmlDoc.querySelector('otherCitDet'),
        functions = xmlDoc.querySelector('idPurp'),
        overview = xmlDoc.querySelector('idAbs'),
        other = xmlDoc.querySelector('suppInfo'),
        resolution = xmlDoc.querySelector('value'),
        tags = xmlDoc.querySelector('searchKeys'),
        geographic_coverage = xmlDoc.querySelector('exDesc'),
        date_of_content = xmlDoc.querySelector('tempDesc'),
        frequency_of_updates = xmlDoc.querySelector('duration'),
        license = xmlDoc.querySelector('LegConsts useLimit'),
        cautions = xmlDoc.querySelector('Consts useLimit'),
        source = xmlDoc.querySelector('srcDesc'),
        download_data = xmlDoc.querySelectorAll('onLineSrc linkage');

  if (title) {
    result.title = title.textContent;
  }

  if (subtitle) {
    result.subtitle = subtitle.textContent;
  }

  if (learn_more.length) {
    result.learn_more = learn_more[0].textContent;
  }

  if (citation) {
    result.citation = citation.textContent;
  }

  if (functions) {
    result.function = functions.textContent;
  }

  if (overview) {
    result.overview = overview.textContent;
  }

  if (other) {
    result.other = other.textContent;
  }

  if (resolution) {
    result.resolution = resolution.textContent;
  }
  if (tags) {
    const keywords = [];
    for (let i = 1; i < tags.childElementCount; i++) {
      keywords.push(tags.childNodes[i].textContent);
    }
    result.tags = keywords.join(', ');
  }

  if (geographic_coverage) {
    result.geographic_coverage = geographic_coverage.textContent;
  }

  if (date_of_content) {
    result.date_of_content = date_of_content.textContent;
  }

  if (frequency_of_updates) {
    result.frequency_of_updates = frequency_of_updates.textContent;
  }

  if (license) {
    result.license = license.textContent;
  }

  if (cautions) {
    result.cautions = cautions.textContent;
  }

  if (source) {
    result.source = source.textContent;
  }

  if (download_data && download_data[0]) {
    result.download_data = download_data[0].textContent;
  }
  return result;
}

export default {

  get (layerId) {
    return _cache[layerId];
  },

  fetch (layer, cartoId) {
    const promise = new Deferred();
    let url;
    // If a technicalName is configured, fetch from the metadata API
    // else, attempt to fetch it from the mapservice
    if (layer.technicalName) {
      url = `${urls.metadataApi}/${layer.technicalName}`;
      getMetadataTask(url).then(results => {
        _cache[layer.id] = results;
        promise.resolve(results);
      });
    } else if (layer.itemId) {
      // This commented out URL contains a good item id to use for testing
      // url = urls.metadataXmlEndpoint('30e234e880c94a2ca54be9a132808eae');
      url = urls.metadataXmlEndpoint(layer.itemId);
      getXMLTask(url).then(xmlDocument => {
        promise.resolve(reduceXML(xmlDocument));
      }, () => {
        const {subId} = layer;
        url = urls.agolItemEndpoint(layer.itemId);
        getServiceInfoTask(url, {f: 'json'}).then(results => {
          _cache[subId] = results;
          promise.resolve(results);
        }, () => {
          promise.resolve();
        });
      });
    } else if (layer.esriLayer) {
      const {esriLayer, subIndex, subId} = layer;
      url = `${esriLayer.url}/${subIndex !== undefined ? subIndex : ''}`;
      getServiceInfoTask(url, {f: 'json'}).then(results => {
        _cache[subId] = results;
        promise.resolve(results);
      });
    } else if (layer.cartoLayer) {
      const {subId} = layer;
      url = urls.cartoMetaEndpoint(layer.cartoUser, cartoId ? cartoId : layer.cartoLayerId, layer.cartoApiKey);
      const cartoMeta = getCartoMetadata(url);
      cartoMeta.then(results => {
        _cache[subId] = JSON.parse(results);
        promise.resolve(reduceCarto(JSON.parse(results)));
      });
    } else {
      promise.resolve();
    }
    return promise;
  }

};
