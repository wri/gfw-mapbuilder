import React from 'react';
import { shallow } from 'enzyme';
import AnalysisTypeSelect from '../src/js/components/AnalysisPanel/AnalysisTypeSelect';
import AnalysisMultiDatePicker from '../src/js/components/AnalysisPanel/AnalysisFormElements/AnalysisMultiDatePicker';


const context = {
  language: 'en',
  settings: {}
};

describe('<AnalysisTypeSelect />', () => {
  it('should render <AnalysisMultiDatePicker /> when multi is true', () => {
    const testAnalysisModules = [
      {
        analysisId: 'GLAD_ALERTS',
        label: {
          en: 'GLAD Alerts'
        },
        uiParams: [
          {
            inputType: 'datepicker',
            multi: true,
          },
        ],
      },
    ];
    const wrapper = shallow(<AnalysisTypeSelect activeAnalysisType='default' analysisItems={testAnalysisModules} />, { context });
    wrapper.setContext(context);
    expect(wrapper.find(AnalysisMultiDatePicker));
  });
});
