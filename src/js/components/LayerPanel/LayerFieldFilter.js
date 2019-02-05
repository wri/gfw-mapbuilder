import React, {Component, PropTypes} from 'react';
import layerActions from 'actions/LayerActions';
import utils from 'utils/AppUtils';
import text from 'js/languages';

export default class LayerFieldFilter extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      value: 'None Selected',
      filters: [{label: 'None Selected'}]
    };

  }

  componentWillMount() {
    // Make request for dropdown options..
    const {layer} = this.props;


  }


  renderDropdownOptions = (option, index) => {
    return <option key={index} value={option.label}>{option.label}</option>;
  }


  render () {
    const { layer } = this.props;
    const { value, filters } = this.state;
    const { language } = this.context;
    // console.log('>>', layer);
    return (
      <div className='layer-field-filter'>
        <p>Filter by group</p>
        <div className='relative'>
          <select
            value={value}
            onChange={this.onSelectFilter}>
            {filters.map(this.renderDropdownOptions)}
          </select>
          <div className='fa-button sml white'>{value}</div>
        </div>
      </div>
    );
  }
}
