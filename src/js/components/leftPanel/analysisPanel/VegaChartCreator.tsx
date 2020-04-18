//getting around typescript not liking globals from cdn
declare const vega: any;

export function generateAndAttachVegaChart(
  spec: any | null,
  domref: React.MutableRefObject<null> | null,
  language: string,
  report?: boolean | undefined
): void {
  //lang awareness
  if (spec.signals && spec.signals.length > 0) {
    const signalLanguage = spec.signals.find(
      (signal: any) => signal.name === 'language'
    );
    const signalIndex = spec.signals.findIndex(
      (signal: any) => signal.name === 'language'
    );
    if (signalLanguage && signalLanguage.value !== language) {
      spec.signals[signalIndex].value = language;
    }
  }

  //In case of report, we tell chart to resize appropriately
  if (report) {
    if (!spec.signals) {
      spec.signals = [];
    }
    spec.autosize = {
      type: 'fit',
      resize: true
    };

    const resizeWidthSignal = {
      name: 'width',
      update: 'containerSize()[0]*0.95',
      value: '',
      on: [
        {
          events: {
            source: 'window',
            type: 'resize'
          },
          update: 'containerSize()[0]*0.95'
        }
      ]
    };
    spec.signals.push(resizeWidthSignal);
  }

  new vega.View(vega.parse(spec), {
    rendered: 'svg',
    container: domref
  })
    .renderer('svg') // Vega needs to be rendered in an svg, not canvas!
    .hover()
    .run()
    .toImageURL('png');
}
