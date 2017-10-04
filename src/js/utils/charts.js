/* eslint no-unused-vars: 0 */
import analysisKeys from 'constants/AnalysisConstants';
import number from 'dojo/number';
/**
* Module to help in generating charts and also in formatting data for the charts
* Formatting functions should start with formatXXXX and return series and optionally colors
*/
export default {

	/**
	* Make a simple bar chart
	* @param {HTML Element} el
	* @param {array[string]} labels
	* @param {array[string(Hex or RGB)]} colors - color value for the data
	* @param {array[ {name: string, data: [numbers]} ]} series - data for the chart
	*/
	makeSimpleBarChart: (el, labels, colors, series) => {
		const chart = new Highcharts.Chart({
			chart: { renderTo: el, type: 'bar' },
			title: { text: null },
			xAxis: {
				title: { text: null },
				categories: labels,
				maxPadding: 0.5
			},
			yAxis: { title: { text: null }},
			tooltip: { useHTML: true },
			series: series,
			colors: colors,
			credits: { enabled: false }
		});
	},

	/**
	* Generate pie chart for composition analysis
	* @param {HTML Element} el
	* @param {array[ { y: number, name: string, color: string(Hex or RGB) } ]} series - data for the chart
	* @param {number=} width - Width of the legend, the labels for this are huge and may need to be forced into
	* a specific width, it will use element.clientWidth || 290 (Analysis Panel Width) if nothing is provided
	*/
	makeCompositionPieChart: (el, series, width) => {
		const legendWidth = width = width || el.clientWidth || 290;
		const chart = new Highcharts.Chart({
			chart: { renderTo: el, type: 'pie' },
			title: { text: null },
			plotOptions: {
				pie: {
					dataLabels: { enabled: false },
					allowPointSelect: true,
					showInLegend: true,
					cursor: 'pointer'
				}
			},
			legend: {
        layout: 'vertical',
        verticalAlign: 'bottom',
				itemStyle: {
					'font-size': '10.5px'
        },
        navigation: {
          activeColor: '#3E576F',
          animation: true,
          arrowSize: 12,
          inactiveColor: '#CCC',
          style: {
            fontWeight: 'bold',
            color: '#333',
            fontSize: '12px'
          }
        }
			},
			tooltip: { useHTML: true },
			series: series,
			credits: { enabled: false }
		});
	},

	/**
	* Generate a stacked bar chart for the restoration analysis
	* @param {HTML Element} el
	* @param {string} name
	* @param {array[ {name: string, color: string(Hex or RGB), data: [number] }]} series - data for the chart
	*/
	makeRestorationBarChart: (el, name, series) => {
		const chart = new Highcharts.Chart({
			chart: { renderTo: el, type: 'bar' },
			title: { text: name, align: 'left' },
			legend: { align: 'left' },
			xAxis: { title: { text: false}, labels: { enabled: false}, categories: [name]},
			yAxis: { reversedStacks: false, title: { text: 'Hectares (k = 1000)' }},
			plotOptions: { series: { stacking: 'normal'}},
			tooltip: { valueSuffix: ' (Ha)', useHTML: true },
			series: series,
			credits: { enabled: false },
			analysis: analysisKeys.ANALYSIS_TYPE_RESTORATION
		});
	},

	/**
	* Generate a stacked bar chart for the SAD Alerts
	* @param {HTML Element} el
	* @param {string[]} categories
	* @param {array[ {name: string, color: string(Hex or RGB), data: [number] }]} series - data for the chart
	*/
	makeStackedBarChart: (el, categories, series) => {
		// Height is data length * 20px per row plus 120px for margins
		const height = categories.length * 20 + 120;
		const chart = new Highcharts.Chart({
			chart: { renderTo: el, type: 'bar', height: height },
			title: { text: null },
			xAxis: { title: { text: false}, categories: categories},
			yAxis: { reversedStacks: false, title: { text: 'Hectares (k = 1000)' }},
			plotOptions: { series: { stacking: 'normal'}},
			tooltip: { valueSuffix: ' (Ha)', useHTML: true, shared: true },
			series: series,
			credits: { enabled: false }
		});
	},
	/**
	* Generate a stacked bar chart
	* @param {HTML Element} el - MUST HAVE AN ID
	* @param {array[string]} labels
	* @param {array[string(Hex or RGB)]} colors - color value for the data
	* @param {array[string]} tooltips
	* @param {array[ {name: string, data: [numbers]} ]} series - data for the chart
	* NOTE: the element needs an id because we need to query the DOM and append title elements
	* the element we need to append to is generic in highcharts so if we have more then one chart,
	* it would effect them all without this id
	*/
	makeSlopeBarChart: (el, labels, colors, tooltips, series) => {
		//- Break the string on spaces and add a <br> after at least 20
		//- characters at the end of the next word
		const breakLabel = (tooltip) => {
			const result = [], words = tooltip.split(' ');
			let str = '';
			words.forEach((word, index) => {
				if (str.length > 20) {
					result.push(`${str} ${word}`);
					str = '';
				} else {
					str = `${str} ${word}`;
					// If this is the last word, push it on the array
					if (words.length - 1 === index) { result.push(`${str}`); }
				}
			});
			//- Add a colon to the last word
			result[result.length - 1] += ':';
			return result.join('<br>');
		};

		const numberWithCommas = (roundedValue) => {
			return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		};

		const roundHighcharts = (value) => {
			const result = Math.round(value / 100) * 100;
			return numberWithCommas(result);
		};

		const chart = new Highcharts.Chart({
			chart: { renderTo: el, type: 'bar' },
			title: { text: null },
			xAxis: {
				categories: labels,
				maxPadding: 0.5,
				title: { text: null }
			},
			yAxis: { title: { text: 'Hectares (k = 1000)' }},
			tooltip: {
				useHTML: true,
				valueSuffix: ' (Ha)',
				formatter: function () {
					return `${breakLabel(tooltips[this.point.index])} <b>${roundHighcharts(this.y)} (Ha)</b>`;
				}
			},
			plotOptions: { bar: { colorByPoint: true, colors: colors } },
			series: series,
			legend: { enabled: false },
			credits: { enabled: false },
			analysis: analysisKeys.ANALYSIS_TYPE_SLOPE
		});

		const addTooltips = (querystring) => {
			const textNodes = document.querySelectorAll(querystring);
			let title;
			for (var i = 0; i < textNodes.length; i++) {
				title = document.createElement('title');
				title.innerHTML = tooltips[i];
				textNodes[i].insertBefore(title, textNodes[i].firstChild);
				//- "Refresh" the Text node
				textNodes[i].innerHTML = textNodes[i].innerHTML;
			}
		};

		if (el.id) {
			addTooltips(`#${el.id} .highcharts-xaxis-labels text`);
		} else {
			console.warn('Attempting to add tooltips, you should give this chart element an ID so this does not interfere with other charts.');
			addTooltips('.highcharts-xaxis-labels text');
		}

	},

	/**
	* Make stacked bar chart, similar to restorationBarChart with some minor differences
	* @param {HTML Element} el
	* @param {array[string]} labels
	* @param {array[string(Hex or RGB)]} colors - color value for the data
	* @param {array[ {name: string, data: [numbers]} ]} series - data for the chart
	* @param {number=} width - Width of the legend, the labels for this are huge and may need to be forced into
	* a specific width, it will use element.clientWidth || 290 (Analysis Panel Width) if nothing is provided
	*/
	makeTotalLossBarChart: (el, labels, colors, series, width) => {
		const legendWidth = width = width || el.clientWidth || 290;
		const chart = new Highcharts.Chart({
			chart: { renderTo: el, type: 'bar' },
			title: { text: null },
			xAxis: {
				categories: labels,
				maxPadding: 0.5,
				title: { text: null }
			},
			yAxis: {
				reversedStacks: false,
				stackLabels: { enabled: true },
				title: { text: null }
			},
			legend: {
				layout: 'vertical',
				enabled: true,
				verticalAlign: 'bottom',
				// align: 'left',
				// itemDistance: 100,
				// Subtract a decent amount for padding
				itemStyle: { width: `${legendWidth - 20}px` }
			},
			tooltip: { useHTML: true },
			plotOptions: { series: { stacking: 'normal' }},
			credits: { enabled: false },
			series: series,
			colors: colors
		});
	},

	/**
	* Make bar chart with a trend line (aka spline chart in highcharts lingo)
	* @param {HTML Element} el
	* @param {object} options
	* @param {function} callback
	* @return {object} chart
	*/
	makeBiomassLossChart: (el, options, callback) => {
		const {categories, series} = options;
		if (!callback) { callback = function(){}; }
		const chart = new Highcharts.Chart({
			chart: { renderTo: el },
			title: { text: null },
			credits: { enabled: false },
			xAxis: [{
				categories: categories, //years
				labels: { enabled: false }
			}],
			yAxis: [{
				labels: { enabled: false },
				title: { text: null }
			}, {
				labels: { enabled: false },
				title: { text: null },
				opposite: true
			}],
			tooltip: {
				shared: true,
				useHTML: true,
				backgroundColor: '#FFF',
				formatter: function () {
					return `<div style='font-size:20px;width: 80px;'>${this.x}</div>` +
						`<div style='font-size:12px;color:${this.points[0].color};'>${number.format(this.points[0].y, { places: 0 })} t CO<sub>2</sub></div>` +
						`<div style='font-size:12px;color:${this.points[1].color};'>${number.format(this.points[1].y, { places: 0 })} Ha</div>`;
				}
			},
			series: series
		}, callback);
	},

	makeTimeSeriesCharts: (el, options) => {
		const {data, name} = options;
		const chart = new Highcharts.Chart({
			chart: {
				renderTo: el,
				zoomType: 'x',
				resetZoomButton: {
					position: {
						align: 'left',
						y: 0
					}
				}
			},
			title: { text: null },
			xAxis: { type: 'datetime' },
			credits: { enabled: false },
			yAxis: { title: { text: null }, min: 0},
			plotOptions: {
				area: {
					threshold: null,
					lineWidth: 1,
					states: { hover: { lineWidth: 1 }},
					fillColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0, 'rgba(220,102,153, 1)'],
							[1, 'rgba(220,102,153, 0)']
						]
					}
				}
			},
			tooltip: {
				dateTimeLabelFormats: { hour: '%A, %b %e' }
			},
			series: [{
				type: 'area',
				name: name,
				data: data
			}]
		});
	},

	makeDualAxisTimeSeriesChart: (el, options) => {
		const {categories, series} = options;
		const chart = new Highcharts.Chart({
			chart: {
				renderTo: el,
				zoomType: 'x',
				resetZoomButton: {
					position: {
						align: 'left',
						y: 0
					}
				}
			},
			title: { text: null },
			credits: { enabled: false },
			xAxis: [{
				categories: categories, //month/year, e.g. 9/2015
				labels: { enabled: false }
			}],
			yAxis: [{
				title: { text: null }
			}, {
				title: { text: null },
				opposite: true
			}],
			tooltip: {
				shared: true,
				useHTML: true,
				backgroundColor: '#FFF',
				dateTimeLabelFormats: { hour: '%A, %b %e' }
			},
			series: series
		});
	},

	/**
	* @typedef BiomassSeries
	* @type Object
	* @property {Object[]} series - Array of chart series objects
	* @property {number} grossLoss - Total loss
	* @property {number} grossEmissions - Total emissions
	*/

	/**
	* Takes an API response from the GFW API and formats it into an array of series for the dual axis chart above
	* @param {object} options
	* @property {object} options.data - response data
	* @property {string} options.lossColor - color for the loss series
	* @property {string} options.carbonColor - color for the carbon series
	* @property {string} options.lossName - name for the loss series
	* @property {string} options.carbonName - name for the carbon series
	* @return {BiomassSeries} result
	*/
	formatSeriesForBiomassLoss: (options) => {
		const { data, lossColor, carbonColor, lossName, carbonName } = options;
		const { co2LossByYear, treeLossByYear, biomassLossByYear } = data;
		const series = [];

		// Gross Carbon Emissions
		const grossEmissions = Object.keys(co2LossByYear).map(key => co2LossByYear[key]).reduce((a, b) => a + b, 0);
		// MtCO2 per year
		const carbonEmissions = Object.keys(biomassLossByYear).map(key => biomassLossByYear[key]);
		// Tree cover loss in hectares per year
		const treeCoverLoss = Object.keys(treeLossByYear).map(key => treeLossByYear[key]);
		// Total tree cover loss in carbon
		const grossLoss = treeCoverLoss.reduce((a, b) => a + b, 0);

		series.push({
			type: 'column',
			name: carbonName,
			data: carbonEmissions,
			color: carbonColor
		});

		series.push({
			yAxis: 1,
			type: 'spline',
			name: lossName,
			data: treeCoverLoss,
			marker: {
				lineColor: lossColor,
				fillColor: lossColor
			},
			color: lossColor
		});

		return {
			series,
			grossLoss,
			grossEmissions
		};
	},

	/**
	* Takes Xs, Ys, Encoder, Labels, Counts and Colors, and returns series and colors for the chart
	* @param {object} options
	* @property {array[number]} options.Xs
	* @property {array[number]} options.Ys
	* @property {Encoder} options.encoder - Defined in analysisUtils
	* @property {array[number]} options.counts
	* @property {array[string]} options.labels
	* @property {array[string]} options.colors
	* @property {boolean} options.isSimple
	* @return {object{ series: array[{name: string, data: [number]}], colors: array[string]}}
	*/
	formatSeriesWithEncoder: (options) => {
		const {Xs, Ys, encoder, labels, counts, colors, isSimple} = options;
		const series = [], outputColors = [];
		let index, data;
		//- Simple means that the layer does not have many classes and is a binary raster,
		//- it used a simplified rendering rule to fetch the data and does not need the encoder
		if (isSimple && counts.some(value => value !== 0)) {
			series.push({
				'name': labels[0],
				'data': counts.slice(1)
      });
			outputColors.push(colors[0]);
		} else {
			for (let i = 0; i < Ys.length; i++) {
				data = [];
				for (let j = 0; j < Xs.length; j++) {
          index = encoder.encode(Xs[j], Ys[i]);
					data.push(counts[index] || 0);
        }
				if (data.some((value) => value !== 0)) {
					series.push({
						'name': labels[i],
						'data': data
					});
					outputColors.push(colors[i]);
        }
			}
    }

		return {
			series: series,
			colors: outputColors
		};
	},

	/**
	* Formats data for a composition pie chart
	* @param {object} options
	* @property {string} options.name
	* @property {array[number]} options.counts
	* @property {array[string]} options.labels
	* @property {array[string]} options.colors
	* @return {array[{type: 'pie', name: string, data: array[number]}]} series
	*/
	formatCompositionAnalysis: (options) => {
		const {name, counts, labels, colors} = options;
		const data = [];
		//- Ignore counts with a 0 value
		counts.forEach((count, index) => {
			if (count) {
				data.push({
					color: colors[index],
					name: labels[index],
					y: count
				});
			}
		});

		return [{
			type: 'pie',
			name: name,
			data: data
		}];
	},

	/**
	* @typedef SadData
	* @type Object
	* @property {string[]} categories - Array of labels for the chart
	* @property {object[]} series - Series with name, color, and data for highcharts
	*/

	/**
	* Formats data specifically for SAD Alerts, takes a bin object (see below), and outputs labels and series
	* @param {object} options
	* @param {object} options.alerts
	* @param {string} options.alerts[year] - Year value containing data related to the specified year
	* @param {string} options.alerts[year][month] - Numeric representation of the month, 0 indexed, so increment it by 1
	* @param {string} options.alerts[year][month]['degrad'|'defor'] - Type of alert
	* @param {object} options.names['degrad'|'defor'] - Names of the series, value of prop is string
	* @param {object} options.colors['degrad'|'defor'] - Colors for the series, value of prop is string
	* @return {SadData} - Formatted data for highcharts consumption
	*/
	formatSadAlerts: (options) => {
		const {alerts, names, colors} = options;
		const categories = [], series = [], degraded = [], deforest = [];
		let year, month, degrad, defor;

		// Convert results from meters^2 to hectares
		for (year in alerts) {
			for (month in alerts[year]) {
				categories.push(`${+month + 1}/${year}`);
				degrad = alerts[year][month].degrad / 10000;
				defor = alerts[year][month].defor / 10000;
				degraded.push(degrad ? +degrad.toFixed(2) : 0);
				deforest.push(defor ? +defor.toFixed(2) : 0);
			}
		}

		series.push({
			name: names.degrad,
			color: colors.degrad,
			data: degraded
		});

		series.push({
			name: names.defor,
			color: colors.defor,
			data: deforest
		});

		return {
			categories,
			series
		};
	}

};
