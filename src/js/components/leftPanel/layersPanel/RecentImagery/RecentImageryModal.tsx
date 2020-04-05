import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import imageryText from './imageryLanguages';
import { DaySelector } from './DaySelector';
import { MonthSelector } from './MonthSelector';
import { CloudSlider } from './CloudSlider';
import { ImageStylePicker } from './ImageStylePicker';
import { mapController } from 'js/controllers/mapController';
import { subMonths, parse, format } from 'date-fns';

interface ImageryProps {
  modalHandler: () => void;
}

const getTodayDate = new Date().toISOString().split('T')[0];

const RecentImagery = (props: ImageryProps): JSX.Element => {
  const { selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );

  const [day, setDay] = useState(getTodayDate);
  const [monthRange, setMonthRange] = useState(
    imageryText[selectedLanguage].monthsOptions[0].value
  );
  const [cloudRange, setCloudRange] = useState([0, 100]);
  const [imageryStyle, setImageryStyle] = useState(
    imageryText[selectedLanguage].imageStyleOptions[0]
  );

  React.useEffect(() => {
    const satIMGURL =
      'https://production-api.globalforestwatch.org/recent-tiles';
    const { latitude, longitude } = mapController.getMapviewCoordinates();
    const end = day;
    //Start day is always 3 months before the end day
    const start = subMonths(parse(end, 'yyyy-MM-dd', new Date()), 3);
    const startFormatted = format(start, 'yyyy-MM-dd');
    console.log('startFormatted', startFormatted);
    console.log(start);
    const recentTileURL = `${satIMGURL}?lon=${longitude}&lat=${latitude}&start=${startFormatted}&end=${end}`;
    console.log('recentTileURL', recentTileURL);
  }, [selectedLanguage, day, monthRange, cloudRange, imageryStyle]);
  // useState(() => {

  // }, []);

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
            <MonthSelector
              lang={selectedLanguage}
              monthRange={monthRange}
              changeMonthHandler={(e: any): void =>
                setMonthRange(e.target.value)
              }
            />
            <p> {imageryText[selectedLanguage].before}</p>
            <DaySelector
              todayDate={getTodayDate}
              day={day}
              setDay={(val: string): void => setDay(val)}
            />
          </div>
        </div>
        <div className="imagery-cloud">
          <p className="subtitle">
            {imageryText[selectedLanguage].cloudPercentage}
          </p>
          <CloudSlider
            cloudRange={cloudRange}
            handleSliderChange={(val: number[]): void => setCloudRange(val)}
          />
        </div>
      </div>
      <div className="imagery-secondary-filters">
        <p>Thumbnail TXT</p>
        <ImageStylePicker
          imageryStyle={imageryStyle}
          lang={selectedLanguage}
          changeStyleHandler={e => setImageryStyle(e.target.value)}
        />
      </div>
      <div className="imagery-thumbnails">
        <p>Thumbnails</p>
      </div>
    </div>
  );
};

export default RecentImagery;
