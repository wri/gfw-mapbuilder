import { shallow } from 'enzyme';
import AnalysisTypeSelect from '../src/js/components/AnalysisPanel/AnalysisTypeSelect';
import AnalysisMultiDatePicker from '../src/js/components/AnalysisPanel/AnalysisFormElements/AnalysisMultiDatePicker';

describe('<AnalysisTypeSelect />', () => {
  it('should render <AnalysisMultiDatePicker /> when multi is true', () => {
    const testAnalysisModules = [
      {
        uiParams: [
          {
            inputType: 'datepicker',
            multi: true,
          },
        ],
      },
    ];
    const wrapper = shallow(<AnalysisTypeSelect analysisItems={testAnalysisModules} />);
    expect(wrapper.find(AnalysisMultiDatePicker));
  });
});
