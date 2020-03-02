//getting around typescript not liking globals from cdn
declare const vega: any;

export function generateAndAttachVegaChart(
  spec: object | null,
  domref: React.MutableRefObject<null> | null
): void {
  new vega.View(vega.parse(spec), {
    rendered: 'svg',
    container: domref
  })
    .renderer('svg') // Vega needs to be rendered in an svg, not canvas!
    .hover()
    .run()
    .toImageURL('png');
}
