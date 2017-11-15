import analysisKeys from 'constants/AnalysisConstants';
import resources from 'resources';

import 'vendor/file-saver.js/FileSaver.js';
// import 'FileSaver';

const base64_encode = function base64_encode (data) {
	//  discuss at: http://phpjs.org/functions/base64_encode/
	// original by: Tyler Akins (http://rumkin.com)
	// improved by: Bayron Guevara
	// improved by: Thunder.m
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Rafał Kukawski (http://kukawski.pl)
	// bugfixed by: Pellentesque Malesuada
	//   example 1: base64_encode('Kevin van Zonneveld');
	//   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	//   example 2: base64_encode('a');
	//   returns 2: 'YQ=='

	var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = '',
			tmp_arr = [];

	if (!data) {
		return data;
	}

	do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	enc = tmp_arr.join('');

	var r = data.length % 3;

	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};

const base64toBlob = function base64toBlob (base64Data, contentType) {
	// Taken From: http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
	contentType = contentType || '';
	var sliceSize = 1024;
	var byteCharacters = atob(base64Data);
	var bytesLength = byteCharacters.length;
	var slicesCount = Math.ceil(bytesLength / sliceSize);
	var byteArrays = new Array(slicesCount);

	for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		var begin = sliceIndex * sliceSize;
		var end = Math.min(begin + sliceSize, bytesLength);

		var bytes = new Array(end - begin);
		var i = 0;
		for (var offset = begin; offset < end; ++i, ++offset) {
			bytes[i] = byteCharacters[offset].charCodeAt(0);
		}
		byteArrays[sliceIndex] = new Uint8Array(bytes);
	}
	return new Blob(byteArrays, { type: contentType });
};

const downloadCSV = function downloadCSV (filename, csvString) {
	// Generate the desired output
	// Try the provided methods first as they will allow the file to be named
	// worst case, use the final option
	var hrefValue = 'data:application/vnd.ms-excel;base64,',
			blobType = 'text/csv;charset=utf-8;',
			link = document.createElement('a'),
			blob;

	if (window.navigator.msSaveOrOpenBlob) {
		blob = base64toBlob(base64_encode(csvString), blobType);
		navigator.msSaveBlob(blob, filename);
	} else if (saveAs && !!Blob) {
		// If the FileSaver is loaded from cdn correctly and is supported in this browser, use it
		blob = base64toBlob(base64_encode(csvString), blobType);
		saveAs(blob, filename);
	} else if (link.download === '') {
		link.href = hrefValue + base64_encode(csvString);
		link.target = '_blank';
		link.download = filename;
		link.click();
	} else {
		window.open(hrefValue + base64_encode(csvString));
	}
};

const getTitleFromNode = function getTitleFromNode (node) {
	// If its a custom feature, the value comes from an input, else, it comes from the node
	var customFeatureInput = document.querySelector('.custom-feature__input');
	return customFeatureInput && customFeatureInput.value ?
		customFeatureInput.value :
		(node ? node.innerHTML : '');
};

/**
* The context for this in this function is bound to that of Highcharts,
* so you can access chart data and options through this
*/
export default function generateCSV () {
	const titleNode = document.querySelector('.analysis-results__title');
	const type = this.options.chart.type;
	const {userOptions, series} = this;
	const lineEndings = '\r\n';
	const csvData = [];

	let title = getTitleFromNode(titleNode),
			filename = series[0].name,
			values = [],
			output, headers;

	if (type === 'pie') {
		//- Set up the title
		title = `${title} - ${filename}`;
		csvData.push(`${title}${lineEndings}`);

		// Set up column headers
		headers = ['Category', 'Value'];
		csvData.push(headers.join(','));

		series[0].data.forEach((entry) => {
			csvData.push(`${entry.name},${entry.y}`);
		});

		output = csvData.join(lineEndings);
	} else if (userOptions.analysis === analysisKeys.ANALYSIS_TYPE_RESTORATION) {
		// Setup filename and title
		filename = this.title && this.title.textStr;
		title = `${title} - ${filename}`;
		csvData.push(`${title}${lineEndings}`);
		// Set up column headers
		headers = ['Category', 'Value'];
		csvData.push(headers.join(','));
		// Add each series and its corresponding value to the output
		series.forEach((serie) => {
			csvData.push(`${serie.name},${serie.yData[0]}`);
		});

		output = csvData.join(lineEndings);
	} else if (userOptions.analysis === analysisKeys.ANALYSIS_TYPE_SLOPE) {
		// Setup title
		title = `${title} - ${filename}`;
		csvData.push(`${title}${lineEndings}`);
		// Set up column headers
		headers = ['Potential', 'Value'];
		csvData.push(headers.join(','));
		//- Push in the Categories from the X Axis and all values associated to each category
		this.xAxis[0].categories.forEach((category, index) => {
			values.push(resources.slopeAnalysisPotentialOptions[index].replace(',', ''));
			series.forEach(serie => { values.push(serie.yData[index]); });
			csvData.push(values.join(','));
			values = [];
		});

		output = csvData.join(lineEndings);
	} else {
		// Setup title
		title = `${title} - ${filename}`;
		csvData.push(`${title}${lineEndings}`);
		// Set up column headers
		headers = series.map(serie => serie.name);

		if (this.xAxis[0] && this.xAxis[0].categories) {
			//- Push in the Categories from the X Axis and all values associated to each category
			this.xAxis[0].categories.forEach((category, index) => {
				values.push(category);
				series.forEach(serie => { values.push(serie.yData[index]); });
				csvData.push(values.join(','));
				values = [];
			});
		} else {
			headers.unshift('Day');
			csvData.push(headers.join(','));

			//- Push in the Categories from the X Axis and all values associated to each category
			this.series[0].processedXData.forEach((date, index) => {
				const d = new Date(date);
				var datestring = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
				values.push(datestring);
				values.push(this.series[0].processedYData[index]);
				csvData.push(values.join(','));
				values = [];
			});
		}

		output = csvData.join(lineEndings);
	}

	downloadCSV(`${filename}.csv`, output);

}
