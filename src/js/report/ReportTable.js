import React, {Component} from 'react';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import locale from 'dojo/date/locale';
import number from 'dojo/number';
import resources from 'resources';

export default class ReportTable extends Component {
    constructor(props){
        super(props);
        this.state = ({
          tableFields: []
        });
    }

    addTableAttributes = () => {
      const {map, params} = this.props;
      const { layerId, OBJECTID, OBJECTID_Field} = params;
      if (layerId && OBJECTID) {
        let resourceLayerId;
        const hashDecoupled = layerId.split('--');
        let url = hashDecoupled[0];
        const id = hashDecoupled[1];
        let mapLayer = map.getLayer(id);
        if (url.includes('dynamicLayer')) {
          const newUrl = url.replace('//dynamicLayer', '');
          const mapLayerId = id.split("_").pop();
          url = `${newUrl}/${mapLayerId}`;
        }

        const queryTask = new QueryTask(url);
        const query = new Query();
        query.where = OBJECTID_Field + ' = ' + OBJECTID;
        query.returnGeometry = false;
        query.outFields = ['*'];
        queryTask.execute(query).then(res => {
          if (res.features && res.features.length > 0) {

            //- If we don't have a map layer, this specific Id is from a sublayer; use it to get the maplayer itself
            if (!mapLayer) {
              if (id.indexOf('_') > -1) {
                resourceLayerId = id.split('_')[0];
                mapLayer = map.getLayer(resourceLayerId);
              }
            }

            if (mapLayer && mapLayer.infoTemplate) {
              const tableFields = [];
              mapLayer.infoTemplate.info.fieldInfos.filter(fieldInfo => fieldInfo.visible).forEach((fieldInfo) => {
                let fieldValue = res.features[0].attributes[fieldInfo.fieldName];
                //- If it is a date, format that correctly
                if (fieldInfo.format && fieldInfo.format.dateFormat) {
                  fieldValue = locale.format(new Date(fieldValue));
                //- If it is a number, format that here, may need a better way
                } else if (fieldInfo.format && fieldInfo.format.places !== undefined) {
                  fieldValue = number.format(fieldValue, fieldInfo.format);
                }
                if (fieldValue && fieldValue.trim) {
                  fieldValue = fieldValue.trim();
                  tableFields.push({
                    fieldLabel: fieldInfo.label,
                    fieldValue
                  });
                }
              });
              this.setState({
                tableFields
              });
            } else if (mapLayer && resourceLayerId) {
              const resourceTableFields = [];
              Object.keys(resources.layerPanel).forEach(key => {
                if (resources.layerPanel[key].layers) {
                  resources.layerPanel[key].layers.forEach(layer => {
                    if (layer.id === resourceLayerId) {
                      if (layer.popup) {
                        layer.popup.content[params.lang].forEach(field => {
                          resourceTableFields.push({
                            fieldLabel: field.label,
                            fieldValue: res.features[0].attributes[field.fieldExpression]
                          });
                        });
                      }
                    }
                  });
                }
              });

              this.setState({
                tableFields: resourceTableFields
              });
              
            }
          }
        });
      }
  };
      
    componentDidMount() {
      this.addTableAttributes();
    }
    
    render() {
        const {tableFields} = this.state;
        return (
          <div className="report-table-container">
            {tableFields.length > 0 &&
              <table className="report-table">
                <tbody>
                {tableFields.map((tableField, index) => {
                  return (
                      <tr key={`field-row-${index}`} className="field-row">
                        <td className="field-label">{tableField.fieldLabel}</td>
                        <td className="field-value">{tableField.fieldValue}</td>
                      </tr>
                  );
                })}
                </tbody>
              </table>
            }
          </div>
        );
    }
}


