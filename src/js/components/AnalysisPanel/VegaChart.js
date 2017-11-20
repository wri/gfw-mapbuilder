import React, { Component } from 'react';

export default class VegaChart extends Component {
  componentDidMount() {
    new vega.View(vega.parse(this.props.config))
    .renderer('canvas')
    .initialize(this.chart)
    .hover()
    .run();
  }

  render() {
    return <div ref={(chart) => { this.chart = chart; }}></div>;
  }
}
