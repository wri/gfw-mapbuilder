import React, {Component, PropTypes} from 'react';
import resources from '../../../resources';

export default class ToggleSwitch extends Component {
  
  render () {
    const {checked, label, onChange, disabled} = this.props;
    const checkedClass = checked ? 'active' : '';
    const disabledClass = disabled ? 'disabled' : '';
    let colorTheme = '';
    const { customColorTheme, defaultColorTheme } = resources;
    if (checkedClass === 'active' && customColorTheme !== '') {
        colorTheme = customColorTheme;
    } else if (checkedClass === 'active' && customColorTheme === '') {
        colorTheme = defaultColorTheme;
    } else {
        colorTheme = '#929292';
    }
    
    return (
      <div>
        <span onClick={onChange} style={{backgroundColor: `${colorTheme}`}} className={`toggle-switch__container ${checkedClass} ${disabledClass}`} className='toggle-switch pointer'><span /></span>
        <span onClick={onChange} className='toggle-switch__label pointer'>{label}</span>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};
