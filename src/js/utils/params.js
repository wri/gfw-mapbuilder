/**
* Convert a paramterized string to an object
* @param {string} querystring - Query string to be expanded into an object
*/
export function toObject(querystring) {
  if (!querystring) { return {}; }
  const result = {};
  const pairs = querystring.split('&').map((item) => {
    return item.split('=').map(str => decodeURIComponent(str));
  });
  // Should have an array of arrays now, ex: [['a','b'], ['foo','bar']]
  pairs.forEach((pair) => {
    if ((pair[0] === null || typeof pair[0] === 'undefined') || (pair[0] === null || typeof pair[0] === 'undefined')) {
      console.warn(`You provided an invalid key-value pair, ${pair[0]} is being omitted.`);
      return;
    }
    result[pair[0]] = pair[1];
  });
  return result;
}

/**
* Convert an object to a string, not the same as JSON.stringify, converts to POST format, ex: key=value&foo=bar
* @param {object} json - A json object to be flattened into a string
*/
export function toQuerystring(json, noEncode) {
  const errorMsg = 'You should not be converting nested objects as they wont encode properly. Try making it a string first.';
  const result = [];
  for (const key in json) {
    if (Object.prototype.toString.call(json[key]) === '[object Object]') {
      throw new Error(errorMsg);
    }
    if (noEncode) {
      result.push(`${key}=${json[key]}`);
    } else {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`);
    }
  }
  return result.join('&');
}

/**
* Return the query parameters from the provided string
* @param {string} path - Path to pull querystring from, should be location.href
* @return {object} - Dictionary containiner the url parameters
*/
export function getUrlParams(path) {
  if (!path) { return {}; }
  const bits = path.split('?');
  const querystring = bits.length > 1 ? bits[1] : '';
  return toObject(querystring);
}
