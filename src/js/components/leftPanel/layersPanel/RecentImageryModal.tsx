import * as React from 'react';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

import imageryText from './imageryLanguages';

interface ImageryProps {
  modalHandler: () => void;
}

const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

const DaySelector = (): JSX.Element => {
  const [day, setDay] = useState(getTodayDate());
  const inputRef = useRef<any>(null);
  const openDatePicker = () => {
    console.log('picker');
    console.log(inputRef.current);
    if (inputRef) {
      inputRef?.current?.open();
      inputRef?.current?.click();
    }
  };
  getTodayDate();
  return (
    <div className="date-section-wrapper" onClick={openDatePicker}>
      <input
        className="date-time-toggle input imagery-input"
        ref={inputRef}
        type="date"
        value={day}
        max={getTodayDate()}
        onChange={(e): void => setDay(e.target.value)}
      />
    </div>
  );
};

interface MonthSelectorProps {
  lang: string;
}
const MonthSelector = (props: MonthSelectorProps) => {
  const [value, setValue] = useState(
    imageryText[props.lang].monthsOptions[0].value
  );
  const changeMonthHandler = (e: any): void => {
    console.log('changing month');
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const options = imageryText[props.lang].monthsOptions.map(
    (option: any, i: number) => {
      return (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      );
    }
  );
  return (
    <select
      className="date-time-toggle imagery"
      onChange={changeMonthHandler}
      value={value}
    >
      {options}
    </select>
  );
};

const RecentImagery = (props: ImageryProps): JSX.Element => {
  const { selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );

  return (
    <div className="recent-imagery-container">
      <div className="imagery-header">
        <span className="title">
          {imageryText[selectedLanguage].imagery[1]}
        </span>
        <button
          className="exit-button"
          onClick={(): void => props.modalHandler()}
        >
          <svg className="svg-icon">
            <svg id="shape-close" viewBox="0 0 25 25">
              <title>Close</title>
              <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z"></path>
            </svg>
          </svg>
        </button>
      </div>
      <div className="imagery-filters">
        <div className="imagery-date">
          <p className="subtitle">
            {imageryText[selectedLanguage].acquisition}
          </p>
          <div className="date-filters">
            <MonthSelector lang={selectedLanguage} />
            <p> {imageryText[selectedLanguage].before}</p>
            <DaySelector />
          </div>
        </div>
        <div className="imagery-cloud">
          <p className="subtitle">
            {imageryText[selectedLanguage].cloudPercentage}
          </p>
          <p>Cloud Slide</p>
        </div>
      </div>
      <div className="imagery-secondary-filters">
        <p>Secondary FIlters</p>
      </div>
      <div className="imagery-thumbnails">
        <p>Thumbnails</p>
      </div>
    </div>
  );
};

export default RecentImagery;
