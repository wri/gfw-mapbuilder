//getting around typescript not liking globals from cdn
declare const vega: any;

export function generateAndAttachVegaChart(
  spec: any | null,
  domref: React.MutableRefObject<null> | null,
  language: string,
  baseConfig: any,
  report?: boolean | undefined,
  callback?: any
): void {
  //lang awareness
  if (spec.signals && spec.signals.length > 0) {
    const signalLanguage = spec.signals.find((signal: any) => signal.name === 'language');
    const signalIndex = spec.signals.findIndex((signal: any) => signal.name === 'language');
    if (signalLanguage && signalLanguage.value !== language) {
      spec.signals[signalIndex].value = language;
    }
  }
  function renderVega(spec: any): void {
    new vega.View(vega.parse(spec), {
      rendered: 'canvas',
      container: domref,
    })
      .renderer('canvas') // Vega needs to be rendered in an svg, not canvas!
      .hover()
      .run()
      .toImageURL('png')
      .then((url: string) => {
        callback(url);
      })
      .catch((e) => {
        console.log('ERROR', { error: e, analysisId: baseConfig.analysisId });
        callback({ error: 'failed to retrieve chart analysis' });
      });
  }

  if (spec.featureDataFieldsToPass && spec.attributes) {
    // WCS Specific logic
    let queryParams = encodeURI(
      spec.featureDataFieldsToPass
        .filter((fieldName: any) => {
          const fieldToSubstitute = baseConfig.fieldToSubstitute ? baseConfig.fieldToSubstitute : 'analyticId';
          return spec.attributes[fieldName === 'analyticid' ? fieldToSubstitute : fieldName];
        })
        .map((fieldName: any) => {
          const fieldToSubstitute = baseConfig.fieldToSubstitute ? baseConfig.fieldToSubstitute : 'analyticId';
          fieldName = fieldName === 'analyticid' ? fieldToSubstitute : fieldName;
          const value = spec.attributes[fieldName];
          fieldName = fieldName === fieldToSubstitute ? 'analyticid' : fieldName;
          return `${fieldName}=${value}`;
        })
        .join('&')
    );

    //We have the correct queryParams, but this 'MapBuilderVegaSQL' also requires the analysisId from the analysisModule sent in as a param: analysisId=...
    let analysisSuffix = '';
    if (baseConfig.analysisId) {
      analysisSuffix = encodeURI('analysisId=' + baseConfig.analysisId);
      if (queryParams) {
        queryParams += '&' + analysisSuffix;
      } else {
        queryParams = analysisSuffix;
      }
    }
    const baseUrl = spec.data[0].url.split('?')[0];
    const url = `${baseUrl}?${queryParams}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const resizeWidthSignal = {
          name: 'width',
          update: 'containerSize()[0]*0.90',
          value: '',
          on: [
            {
              events: {
                source: 'window',
                type: 'resize',
              },
              update: 'containerSize()[0]*0.90',
            },
          ],
        };
        data.signals.push(resizeWidthSignal);
        renderVega(data);
      });
  } else {
    renderVega(spec);
  }
}
