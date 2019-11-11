import React, {Component} from 'react';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import locale from 'dojo/date/locale';
import number from 'dojo/number';

export default class ReportTable extends Component {
    constructor(props){
        super(props);
        this.state = ({
          tableFields: [],
          table: null
        });
    }

    addTableAttributes = () => {
      const {map, params} = this.props;
      const { layerId, OBJECTID, OBJECTID_Field} = params;
      if (layerId && OBJECTID) {
        const hashDecoupled = layerId.split('--');
        let url = hashDecoupled[0];
        console.log('hashDecoupled', hashDecoupled);
        let id = hashDecoupled[1];
        console.log('id before:', id);
        
        const allMapLayerIds = map.layerIds;
        allMapLayerIds.forEach(allMapLayerId => {
          if (id.includes(allMapLayerId)) {
            id = allMapLayerId;
          }
        });
        
        console.log('id after:', id);
        
        const mapLayer = map.getLayer(id);
        console.log('mapLayer :', mapLayer);
        
        const mapLayerId = id.split("_").pop();

        if (url.includes('dynamicLayer')) {
          const newUrl = url.replace('//dynamicLayer', '');
          url = `${newUrl}/${mapLayerId}`;
        }

        const queryTask = new QueryTask(url);
        const query = new Query();
        query.where = OBJECTID_Field + ' = ' + OBJECTID;
        query.returnGeometry = false;
        query.outFields = ['*'];
        queryTask.execute(query).then(res => {
          if (res.features && res.features.length > 0) {
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
            } else if (mapLayer && mapLayer.infoTemplates) {
              const idForMapLayer = mapLayer.layerIds[0];
              const table = mapLayer.infoTemplates[idForMapLayer].infoTemplate.content;
              this.setState({
                table
              }, console.log('table', table) );
              
            }
          }
        });
      }
  };
      
    componentDidMount() {
      this.addTableAttributes();
    }
    
    render() {
        const {tableFields, table} = this.state;
        return (
          <div className="report-table-container">
            {table ? table :
            <div>
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
            }
          </div>
        );
    }
}


