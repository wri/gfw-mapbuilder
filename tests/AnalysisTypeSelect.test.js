import React from 'react';
import { mount } from 'enzyme';
import AnalysisTypeSelect from '../src/js/components/AnalysisPanel/AnalysisTypeSelect';
// import AnalysisMultiDatePicker from '../src/js/components/AnalysisPanel/AnalysisFormElements/AnalysisMultiDatePicker';

const context = {
  language: 'en',
  settings: {}
};

describe('<AnalysisTypeSelect />', () => {
  it('should render an empty AnalysisTypeSelect with no analysis modules', () => {

    const emptyWrapper = mount(
      <AnalysisTypeSelect analysisItems={[]} />, {
        context: context
      }
    );

    expect(emptyWrapper.find('.analysis-results__select').length).toBe(1);
    expect(emptyWrapper.find('.analysis-results__select').children().length).toBe(1);
    expect(emptyWrapper.find('.analysis-results__select').children().at(0).props().value).toBe('default');
    expect(emptyWrapper.find('.analysis-results__select').children().at(0).props().disabled).toBe(true);

  });

  it('should render the proper AnalysisTypeSelect analysis options', () => {
    const testAnalysisModules = [
      {
        analysisId: 'GLAD_ALERTS',
        label: {
          en: 'GLAD Alerts',
          fr: 'Alertes GLAD',
        },
        uiParams: [
          {
            inputType: 'datepicker',
            multi: true,
          },
        ],
      },
    ];

    const wrapper = mount(
      <AnalysisTypeSelect activeAnalysisType='default' analysisItems={testAnalysisModules} />, {
        context: context
      }
    );

    expect(wrapper.find('.analysis-results__select').length).toBe(1);
    expect(wrapper.find('.analysis-results__select').children().length).toBe(2);
    expect(wrapper.find('.analysis-results__select').children().at(0).props().value).toBe('default');
    expect(wrapper.find('.analysis-results__select').children().at(0).props().disabled).toBe(false);
    expect(wrapper.find('.analysis-results__select').children().at(1).props().value).toBe('GLAD_ALERTS');
    expect(wrapper.find('.analysis-results__select').children().at(1).text()).toBe('GLAD Alerts');

    context.language = 'fr';
    wrapper.setContext(context);

    expect(wrapper.find('.analysis-results__select').children().at(1).text()).toBe('Alertes GLAD');

  });

});
