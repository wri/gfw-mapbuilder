import React, {Component, PropTypes} from 'react';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
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
    const { layer } = this.props;
    const { filters } = this.state;

    if (layer.type === 'feature') {
      const url = layer.url;
      const queryTask = new QueryTask(url);
      const query = new Query();
      query.where = '1=1';
      query.returnGeometry = false;
      query.outFields = [layer.filterField];
      query.returnDistinctValues = true;
      queryTask.execute(query).then(res => {
        res.features.forEach((feature) => {
          filters.push({label: feature.attributes[layer.filterField]});
        });

        this.setState({ filters });
      });
    } else if (layer.type === 'dynamic') {
      const promises = [];

      layer.layerIds.forEach((id) => {
        const url = layer.url + '/' + layer.layerIds[id];
        const queryTask = new QueryTask(url);
        const query = new Query();
        query.where = '1=1';
        query.returnGeometry = false;
        query.outFields = [layer.filterField];
        query.returnDistinctValues = true;
        promises.push(queryTask.execute(query));
      });

      Promise.all(promises).then(results => {
        results.forEach((res) => {
          res.features.forEach((feature) => {
            if (!filters.find((filter) => filter.label === feature.attributes[layer.filterField].trim().length)) {
              filters.push({label: feature.attributes[layer.filterField]});
            }
          });
        });
        this.setState({ filters });

      });
    }

  }

  onSelectFilter = (e) => {
    const { map } = this.context;
    const { value } = e.target;
    const { layer } = this.props;

    this.setState({ value });
    const defExpression = value === 'None Selected' ? '1=1' : `${layer.filterField} = '${value}'`;
    const mapLayer = map.getLayer(layer.id);

    if (layer.type === 'feature') {
      mapLayer.setDefinitionExpression(defExpression);
    } else if (layer.type === 'dynamic') {
      const layerDefinitions = [];
      layer.layerIds.forEach((id) => {
        layerDefinitions[id] = defExpression;
      });
      mapLayer.setLayerDefinitions(layerDefinitions);
    }
  }

  renderDropdownOptions = (option, index) => {
    return <option key={index} value={option.label}>{option.label}</option>;
  }


  render () {
    const { value, filters } = this.state;
    const { language } = this.context;
    return (
      <div className='layer-field-filter'>
        <p>{text[language].FILTER_BY_GROUP}</p>
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
