import React, { Component } from 'react';

export default class CustomDropdown extends Component {

  render() {
    const { value, options, onClick, open } = this.props;

    const dropdownOptions = options.map((option, i) => {
      return (
        <div key={`option-${i}`} className='custom-dropdown_option'>{option}</div>
      );
    });

    return (
      <div className='custom-dropdown_container'>
        <button
        className='fa-button sml white pointer'
        onClick={onClick}
        >
        {value}
        </button>

        { open &&
          <div className='custom-dropdown_menu'>
            {dropdownOptions}
          </div>
        }

      </div>
    );
  }
}
