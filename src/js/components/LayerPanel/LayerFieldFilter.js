import React, {Component, PropTypes} from 'react';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import Select from 'react-select';
import mapActions from 'actions/MapActions';
import resources from '../../../resources';

const colorTheme = resources.customColorTheme ? resources.customColorTheme : '#F0AB00';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    color: 'rgb(51, 51, 51)',
    cursor: 'pointer',
    background: state.isSelected ? '#eee' : 'none',
    '&:hover': {
      background: '#eee'
    }
  }),
  control: (provided, state) => ({
      ...provided,
      fontSize: '12px',
      padding: '0px',
      cursor: 'text',
      minHeight: '30px',
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused
        ? colorTheme
        : 'grey',
      '&:hover': {
        borderColor: state.isFocused
          ? colorTheme
          : 'grey',
      }
  }),

};

export default class LayerFieldFilter extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      value: 'None Selected',
      filters: []
    };

  }

  componentWillMount() {
    // Make request for dropdown options..
    const { layer } = this.props;
    const { filters } = this.state;
    const { language } = this.context;

    if (layer.type === 'feature') {
      const url = layer.url;
      const queryTask = new QueryTask(url);
      const query = new Query();
      query.where = '1=1';
      query.returnGeometry = false;
      query.outFields = [layer.filterField[language]];
      query.returnDistinctValues = true;
      queryTask.execute(query).then(res => {
        res.features.forEach((feature) => {
          filters.push({label: feature.attributes[layer.filterField[language]], value: feature.attributes[layer.filterField[language]]});
        });

        this.setState({ filters });
      });
    } else if (layer.type === 'dynamic') {
      const promises = [];

      layer.layerIds.forEach((id) => {
        const url = layer.url + '/' + id;
        const queryTask = new QueryTask(url);
        const query = new Query();
        query.where = '1=1';
        query.returnGeometry = false;
        query.outFields = [layer.filterField[language]];
        query.returnDistinctValues = true;
        promises.push(queryTask.execute(query));
      });

      Promise.all(promises).then(results => {
        results.forEach((res) => {
          res.features.forEach((feature) => {
            if (!filters.find((filter) => feature.attributes[layer.filterField[language]] && filter.label === feature.attributes[layer.filterField[language]].trim().length)) {
              filters.push({label: feature.attributes[layer.filterField[language]], value: feature.attributes[layer.filterField[language]]});
            }
          });
        });

        this.setState({ filters });

      });
    }

  }

  componentDidUpdate(prevProps) {
    const { layer, language } = this.props;
    const filters = [];

    if (prevProps.language !== language) {
      if (layer.type === 'feature') {
        const url = layer.url;
        const queryTask = new QueryTask(url);
        const query = new Query();
        query.where = '1=1';
        query.returnGeometry = false;
        query.outFields = [layer.filterField[language]];
        query.returnDistinctValues = true;
        queryTask.execute(query).then(res => {
          res.features.forEach((feature) => {
            filters.push({label: feature.attributes[layer.filterField[language]], value: feature.attributes[layer.filterField[language]]});
          });

          this.setState({ filters });
        });
      } else if (layer.type === 'dynamic') {
        const promises = [];

        layer.layerIds.forEach((id) => {
          const url = layer.url + '/' + id;
          const queryTask = new QueryTask(url);
          const query = new Query();
          query.where = '1=1';
          query.returnGeometry = false;
          query.outFields = [layer.filterField[language]];
          query.returnDistinctValues = true;
          promises.push(queryTask.execute(query));
        });

        Promise.all(promises).then(results => {
          results.forEach((res) => {
            res.features.forEach((feature) => {
              const filterAttribute = feature.attributes[layer.filterField[language]];
              if (filterAttribute && !filters.find((filter) => filter.label === filterAttribute.trim().length)) {
                filters.push({label: filterAttribute, value: filterAttribute});
              }
            });
          });

          this.inputSelect.state = {
            inputValue: '',
            menuIsOpen: false,
            value: null
          };

          this.setState({
            filters: filters,
            value: 'None Selected'
          });

        });
      }
    }
  }

  onSelectFilter = (option) => {

    const value = option ? option.value : null;
    const { map, language } = this.context;
    const { layer } = this.props;
    const defExpression = !value ? '1=1' : `${layer.filterField[language]} = '${value}'`;
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

    mapActions.setActiveFilters({layerId: layer.id, value});

    this.setState({
      value
    });
  }

  render () {
    const { filters, value } = this.state;
    const { language } = this.context;
    const { layer } = this.props;

    filters.forEach(filter => {
      filter.selected = filter.value === value;
    });

    return (
      <div className='layer-field-filter'>
        { filters.length > 0 &&
          <div>
            <p>{layer.filterLabel[language]}</p>
            <div className='layer-filter relative'>
              <Select
                styles={customStyles}
                onChange={this.onSelectFilter}
                options={filters}
                placeholder={'None Selected'}
                isSearchable={true}
                className={'layer-field-filter-select'}
                isClearable={true}
                ref={el => this.inputSelect = el}
              />
            </div>
          </div>
        }

      </div>
    );
  }
}
