import React, {Component} from 'react';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import locale from 'dojo/date/locale';
import number from 'dojo/number';

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
        const hashDecoupled = layerId.split('--');
        let url = hashDecoupled[0];
        const id = hashDecoupled[1];
        const mapLayer = map.getLayer(id);
        const mapLayerId = id.split("_").pop();
        console.log('id :', id);
        console.log('mapLayerId :', mapLayerId);
        if (url.includes('dynamicLayer')) {
          const newUrl = url.replace('//dynamicLayer', '');
          url = `${newUrl}/${mapLayerId}`;
          
        } 
        
        if (!id.includes('Comunidades')){
          url = `${url}/${mapLayerId}`;
        }
        const queryTask = new QueryTask(url);
        console.log('queryTask :', queryTask);
        const query = new Query();
        query.where = OBJECTID_Field + ' = ' + OBJECTID;
        query.returnGeometry = false;
        query.outFields = ['*'];
        queryTask.execute(query).then(res => {
          console.log('res', res);
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


