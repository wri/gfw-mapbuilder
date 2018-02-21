import React from 'react';
import { shallow } from 'enzyme';
import Navigation from 'components/Navigation/Navigation';
import LanguageToggle from 'components/Navigation/LanguageToggle';
// import AnalysisMultiDatePicker from '../src/js/components/AnalysisPanel/AnalysisFormElements/AnalysisMultiDatePicker';




describe('<Navigation />', () => {
  const context = {
    language: 'en',
    settings: {
      useAlternativeLanguage: false
    }
  };

  it('should Not render <LanguageToggle /> when useAlternativeLanguage is false', () => {
    const wrapper = shallow(<Navigation />, { context });
    wrapper.setContext(context);
    // expect(wrapper.find(AnalysisMultiDatePicker));
    expect(wrapper.find(LanguageToggle).exists()).to.equal(false);
  });
});

// describe('<AnalysisTypeSelect />', () => {
//   it('should render <AnalysisMultiDatePicker /> when multi is true', () => {
//     const testAnalysisModules = [
//       {
//         analysisId: 'GLAD_ALERTS',
//         label: {
//           en: 'GLAD Alerts'
//         },
//         uiParams: [
//           {
//             inputType: 'datepicker',
//             multi: true,
//           },
//         ],
//       },
//     ];
//     const wrapper = shallow(<AnalysisTypeSelect activeAnalysisType='default' analysisItems={testAnalysisModules} />, { context });
//     wrapper.setContext(context);
//     expect(wrapper.find(AnalysisMultiDatePicker));
//   });
// });
