import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import { subscribeConfig } from 'configs/subscribeToAlerts.translations';

interface Props {
  setNextStep: () => void;
  selectedAlerts: Array<string>;
  setSelectedAlerts: (selectedAlerts: Array<string>) => void;
}

const SubscribeToAlerts = (props: Props): JSX.Element => {
  const { selectedAlerts, setSelectedAlerts, setNextStep } = props;
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const {
    title,
    subtitle,
    VIIRSLabel,
    VIIRSField,
    GLADLabel,
    GLADField,
    PRODESLabel,
    PRODESField,
    treeCoverLossLabel,
    treeCoverLossField,
    FORMALabel,
    FORMAField,
    TERRALabel,
    TERRAField,
    SADLabel,
    SADField
  } = subscribeConfig[selectedLanguage];

  const setAlerts = (value: string): void => {
    const selectedAlertsCopy = [...selectedAlerts];
    if (selectedAlertsCopy.includes(value)) {
      const index = selectedAlertsCopy.indexOf(value);
      selectedAlertsCopy.splice(index);
    } else {
      selectedAlertsCopy.push(value);
    }

    setSelectedAlerts(selectedAlertsCopy);
  };

  return (
    <div className="subscribe-to-content-container">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="options-container">
        <ul>
          <div className="column">
            <li>
              <input
                type="checkbox"
                name={VIIRSLabel}
                value={VIIRSField}
                checked={selectedAlerts.includes(VIIRSField)}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setAlerts(e.target.value)
                }
              />
              <label>{VIIRSLabel}</label>
            </li>
            <li>
              <input
                type="checkbox"
                name={GLADLabel}
                value={GLADField}
                checked={selectedAlerts.includes(GLADField)}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setAlerts(e.target.value)
                }
              />
              <label>{GLADLabel}</label>
            </li>
          </div>
          <div className="column">
            <li>
              <input
                type="checkbox"
                name={FORMALabel}
                value={FORMAField}
                checked={selectedAlerts.includes(FORMAField)}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setAlerts(e.target.value)
                }
              />
              <label>{FORMALabel}</label>
            </li>
            <li>
              <input
                type="checkbox"
                name={PRODESLabel}
                value={PRODESField}
                checked={selectedAlerts.includes(PRODESField)}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setAlerts(e.target.value)
                }
              />
              <label>{PRODESLabel}</label>
            </li>
          </div>
          <div className="column">
            <li>
              <input
                type="checkbox"
                name={treeCoverLossLabel}
                value={treeCoverLossField}
                checked={selectedAlerts.includes(treeCoverLossField)}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setAlerts(e.target.value)
                }
              />
              <label>{treeCoverLossLabel}</label>
            </li>
            <li>
              <input
                type="checkbox"
                name={SADLabel}
                value={SADField}
                checked={selectedAlerts.includes(SADField)}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setAlerts(e.target.value)
                }
              />
              <label>{SADLabel}</label>
            </li>
          </div>
          <div className="column">
            <li>
              <input
                type="checkbox"
                name={TERRALabel}
                value={TERRAField}
                checked={selectedAlerts.includes(TERRAField)}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setAlerts(e.target.value)
                }
              />
              <label>{TERRALabel}</label>
            </li>
          </div>
        </ul>
      </div>

      <button
        onClick={(): void => setNextStep()}
        disabled={selectedAlerts.length ? false : true}
        className={`orange-button custom esri-icon-right-arrow ${
          selectedAlerts.length ? '' : 'inactive'
        }`}
      />
    </div>
  );
};

export default SubscribeToAlerts;
