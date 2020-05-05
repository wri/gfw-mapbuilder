import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

const subscribeConfig = {
  en: {
    title: 'Forest change alerts',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRSLabel: 'VIIRS active fire alerts',
    VIIRSField: 'viirs-active-fires',
    GLADLabel: 'GLAD tree cover loss alerts',
    GLADField: 'glad-alerts',
    PRODESLabel: 'PRODES deforestation data',
    PRODESField: 'prodes-loss',
    treeCoverLossLabel: 'Tree cover loss data',
    treeCoverLossField: 'umd-loss-gain',
    SADLabel: 'SAD tree cover loss alerts',
    SADField: 'imazon-alerts',
    FORMALabel: 'FORMA alerts data',
    FORMAField: 'forma-alerts',
    TERRALabel: 'Terra-i tree cover loss alerts',
    TERRAField: 'terrai-alerts'
  },
  //  ["umd-loss-gain", "imazon-alerts"]
  fr: {
    title: 'Alertes sur l’évolution des forêts',
    subtitle:
      'Sélectionnez les alertes de changement forestier que vous souhaitez recevoir',
    VIIRSLabel: 'Alertes incendies actifs VIIRS',
    VIIRSField: 'viirs-active-fires',
    GLADLabel: 'Alertes GLAD sur les pertes de couvert arboré',
    GLADField: 'glad-alerts',
    PRODESLabel: 'Données PRODES sur la déforestation',
    PRODESField: 'prodes-loss',
    treeCoverLossLabel: 'Données sur la perte de la couverture arborée',
    treeCoverLossField: 'umd-loss-gain',
    SADLabel: 'Alertes SAD sur les pertes de la couverture arborée',
    SADField: 'imazon-alerts',
    FORMALabel: 'Données d’alertes FORMA',
    FORMAField: 'forma-alerts',
    TERRALabel: 'Terra-i tree cover loss alerts',
    TERRAField: 'terrai-alerts'
  },
  ka: {
    title: 'ტყის ცვლილების შეტყობინებები',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRSLabel: 'VIIRS აქტიური ხანძრების შეტყობინებები',
    VIIRSField: 'viirs-active-fires',
    GLADLabel: 'GLAD ხის ვარჯის კარგვის შეტყობინებები',
    GLADField: 'glad-alerts',
    PRODESLabel: 'PRODES გაუტყევების მონაცემები',
    PRODESField: 'prodes-loss',
    treeCoverLossLabel: 'ხის ვარჯის კარგვის მონაცემები',
    treeCoverLossField: 'umd-loss-gain',
    SADLabel: 'SAD ხის ვარჯის კარგვის შეტყობინებები',
    SADField: 'imazon-alerts',
    FORMALabel: 'FORMA შეტყობინებების მონაცემები',
    FORMAField: 'forma-alerts',
    TERRALabel: 'Terra-i  ხის ვარჯის კარგვის შეტყობინებები',
    TERRAField: 'terrai-alerts'
  },
  es: {
    title: 'Alertas de cambio forestal',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRSLabel: 'Alertas VIIRS sobre incendios activos',
    VIIRSField: 'viirs-active-fires',
    GLADLabel: 'Alertas GLAD sobre pérdida de cobertura arbórea',
    GLADField: 'glad-alerts',
    PRODESLabel: 'Datos PRODES sobre deforestación',
    PRODESField: 'prodes-loss',
    treeCoverLossLabel: 'Datos sobre la pérdida de cobertura arbórea',
    treeCoverLossField: 'umd-loss-gain',
    SADLabel: 'Alertas SAD sobre pérdida de cobertura arbórea',
    SADField: 'imazon-alerts',
    FORMALabel: 'Datos de alertas FORMA',
    FORMAField: 'forma-alerts',
    TERRALabel: 'Alertas Terra-i sobre pérdida de cobertura arbórea',
    TERRAField: 'terrai-alerts'
  },
  pt: {
    title: 'Alertas de alterações florestais',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRSLabel: 'Alertas de incêndios ativos VIIRS',
    VIIRSField: 'viirs-active-fires',
    GLADLabel: 'Alertas de perda de cobertura arbórea GLAD',
    GLADField: 'glad-alerts',
    PRODESLabel: 'Dados de desmatamento PRODES',
    PRODESField: 'prodes-loss',
    treeCoverLossLabel: 'Dados de perda de cobertura arbórea',
    treeCoverLossField: 'umd-loss-gain',
    SADLabel: 'Alertas de perda de cobertura arbórea SAD',
    SADField: 'imazon-alerts',
    FORMALabel: 'Dados de alertas FORMA',
    FORMAField: 'forma-alerts',
    TERRALabel: 'Alertas de perda de cobertura arbórea Terra-I',
    TERRAField: 'terrai-alerts'
  },
  id: {
    title: 'Peringatan perubahan hutan',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRSLabel: 'Peringatan kebakaran aktif VIIRS',
    VIIRSField: 'viirs-active-fires',
    GLADLabel: 'Peringatan kehilangan tutupan pohon  GLAD',
    GLADField: 'glad-alerts',
    PRODESLabel: 'Data deforestasi PRODES',
    PRODESField: 'prodes-loss',
    treeCoverLossLabel: 'Tree cover loss data',
    treeCoverLossField: 'umd-loss-gain',
    SADLabel: 'Peringatan kehilangan tutupan pohon SAD',
    SADField: 'imazon-alerts',
    FORMALabel: 'Dados de alertas FORMA',
    FORMAField: 'forma-alerts',
    TERRALabel: 'Peringatan kehilangan tutupan pohon Terra-i',
    TERRAField: 'terrai-alerts'
  },
  zh: {
    title: '森林变化预警',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRSLabel: 'VIIRS 活跃火点预警',
    VIIRSField: 'viirs-active-fires',
    GLADLabel: 'GLAD 森林覆盖减少预警',
    GLADField: 'glad-alerts',
    PRODESLabel: 'PRODES 毁林数据',
    PRODESField: 'prodes-loss',
    treeCoverLossLabel: 'Tree cover loss data',
    treeCoverLossField: 'umd-loss-gain',
    SADLabel: 'SAD 森林覆盖减少预警',
    SADField: 'imazon-alerts',
    FORMALabel: 'FORMA 预警数据',
    FORMAField: 'forma-alerts',
    TERRALabel: 'Terra-i 森林覆盖减少预警',
    TERRAField: 'terrai-alerts'
  }
};

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
  } = subscribeConfig[selectedLanguage]; //subscribeConfig[selectedLanguage];

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
        </ul>
      </div>
      <button
        onClick={(): void => setNextStep()}
        disabled={selectedAlerts.length ? false : true}
        className="esri-icon-right-arrow"
      />
    </div>
  );
};

export default SubscribeToAlerts;
