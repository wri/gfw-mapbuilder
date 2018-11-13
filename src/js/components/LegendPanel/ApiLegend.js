import React, { Component } from 'react';

export default class ApiLegend extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: props.visibility,
      opacity: props.defaultOpacity
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
    }

    if (this.props.legendOpacity.layerId === this.props.layerId && this.props.legendOpacity.value !== prevProps.legendOpacity.value) {
      this.setState({ opacity: this.props.legendOpacity.value });
    }
  }

  componentDidMount() {
    this.props.initialLayerOpacities.forEach(opacity => {
      if (opacity.layerId === this.props.layerId) {
        this.setState({ opacity: opacity.value });
      }
    });
  }

  render () {
    const { label, metadata, language } = this.props;

  }
}
