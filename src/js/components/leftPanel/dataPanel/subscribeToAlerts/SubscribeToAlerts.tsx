import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

const subscribeConfig = {
  en: {
    title: 'Forest change alerts',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRS: 'VIIRS active fire alerts',
    GLAD: 'GLAD tree cover loss alerts',
    FORMA: 'FORMA alerts data',
    PRODES: 'PRODES deforestation data',
    treeCoverLoss: 'Tree cover loss data',
    SADTreeCoverLoss: 'SAD tree cover loss alerts',
    terraTreeCoverLoss: 'Terra-i tree cover loss alerts'
  },
  ka: {
    title: 'ტყის ცვლილების შეტყობინებები',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRS: 'VIIRS აქტიური ხანძრების შეტყობინებები',
    GLAD: 'GLAD ხის ვარჯის კარგვის შეტყობინებები',
    FORMA: 'FORMA შეტყობინებების მონაცემები',
    PRODES: 'PRODES გაუტყევების მონაცემები',
    treeCoverLoss: 'ხის ვარჯის კარგვის მონაცემები',
    SADTreeCoverLoss: 'SAD ხის ვარჯის კარგვის შეტყობინებები',
    terraTreeCoverLoss: 'Terra-i  ხის ვარჯის კარგვის შეტყობინებები'
  },
  fr: {
    title: 'Alertes sur l’évolution des forêts',
    subtitle:
      'Sélectionnez les alertes de changement forestier que vous souhaitez recevoir',
    VIIRS: 'Alertes incendies actifs VIIRS',
    GLAD: 'Alertes GLAD sur les pertes de couvert arboré',
    FORMA: 'Données d’alertes FORMA',
    PRODES: 'Données PRODES sur la déforestation',
    treeCoverLoss: 'Données sur la perte de la couverture arborée',
    SADTreeCoverLoss: 'Alertes SAD sur les pertes de la couverture arborée',
    terraTreeCoverLoss: 'Terra-i tree cover loss alerts'
  },
  es: {
    title: 'Alertas de cambio forestal',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRS: 'Alertas VIIRS sobre incendios activos',
    GLAD: 'Alertas GLAD sobre pérdida de cobertura arbórea',
    FORMA: 'Datos de alertas FORMA',
    PRODES: 'Datos PRODES sobre deforestación',
    treeCoverLoss: 'Datos sobre la pérdida de cobertura arbórea',
    SADTreeCoverLoss: 'Alertas SAD sobre pérdida de cobertura arbórea',
    terraTreeCoverLoss: 'Alertas Terra-i sobre pérdida de cobertura arbórea'
  },
  pt: {
    title: 'Alertas de alterações florestais',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRS: 'Alertas de incêndios ativos VIIRS',
    GLAD: 'Alertas de perda de cobertura arbórea GLAD',
    FORMA: 'Dados de alertas FORMA',
    PRODES: 'Dados de desmatamento PRODES',
    treeCoverLoss: 'Dados de perda de cobertura arbórea',
    SADTreeCoverLoss: 'Alertas de perda de cobertura arbórea SAD',
    terraTreeCoverLoss: 'Alertas de perda de cobertura arbórea Terra-I'
  },
  id: {
    title: 'Peringatan perubahan hutan',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRS: 'Peringatan kebakaran aktif VIIRS',
    GLAD: 'Peringatan kehilangan tutupan pohon  GLAD',
    FORMA: 'Data peringatan FORMA',
    PRODES: 'Data deforestasi PRODES',
    treeCoverLoss: 'Tree cover loss data',
    SADTreeCoverLoss: 'Peringatan kehilangan tutupan pohon SAD',
    terraTreeCoverLoss: 'Peringatan kehilangan tutupan pohon Terra-i'
  },
  zh: {
    title: '森林变化预警',
    subtitle: 'Select the forest change alerts you would like to receive',
    VIIRS: 'VIIRS 活跃火点预警',
    GLAD: 'GLAD 森林覆盖减少预警',
    FORMA: 'FORMA 预警数据',
    PRODES: 'PRODES 毁林数据',
    treeCoverLoss: 'Tree cover loss data',
    SADTreeCoverLoss: 'SAD 森林覆盖减少预警',
    terraTreeCoverLoss: 'Terra-i 森林覆盖减少预警'
  }
};

interface Props {
  setNextStep: () => void;
}

const SubscribeToAlerts = (props: Props): JSX.Element => {
  const [selectedAlerts, setSelectedAlerts] = useState<Array<string>>([]);
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const {
    title,
    subtitle,
    VIIRS,
    GLAD,
    FORMA,
    PRODES,
    treeCoverLoss,
    SADTreeCoverLoss,
    terraTreeCoverLoss
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

  /**
   * TODO
   * todo [ ] style to match PROD
   * todo [X] make next/back buttons language aware
   */

  return (
    <div className="subscribe-to-content-container">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="options-container">
        <ul onChange={(e: any): void => setAlerts(e.target.value)}>
          <li>
            <input
              type="checkbox"
              name={VIIRS}
              value={'VIIRS'}
              checked={selectedAlerts.includes('VIIRS')}
            />
            <label>{VIIRS}</label>
          </li>
          <li>
            <input
              type="checkbox"
              name={GLAD}
              value="GLAD"
              checked={selectedAlerts.includes('GLAD')}
            />
            <label>{GLAD}</label>
          </li>
          <li>
            <input
              type="checkbox"
              name={FORMA}
              value="FORMA"
              checked={selectedAlerts.includes('FORMA')}
            />
            <label>{FORMA}</label>
          </li>
          <li>
            <input
              type="checkbox"
              name={PRODES}
              value="PRODES"
              checked={selectedAlerts.includes('PRODES')}
            />
            <label>{PRODES}</label>
          </li>
          <li>
            <input
              type="checkbox"
              name={treeCoverLoss}
              value="treeCoverLoss"
              checked={selectedAlerts.includes('treeCoverLoss')}
            />
            <label>{treeCoverLoss}</label>
          </li>
          <li>
            <input
              type="checkbox"
              name={SADTreeCoverLoss}
              value="SAD"
              checked={selectedAlerts.includes('SAD')}
            />
            <label>{SADTreeCoverLoss}</label>
          </li>
          <li>
            <input
              type="checkbox"
              name={terraTreeCoverLoss}
              value="terraTreeCoverLoss"
              checked={selectedAlerts.includes('terraTreeCoverLoss')}
            />
            <label>{terraTreeCoverLoss}</label>
          </li>
        </ul>
      </div>
      <button
        onClick={(): void => props.setNextStep()}
        disabled={selectedAlerts.length ? false : true}
        className="esri-icon-right-arrow"
      />
    </div>
  );
};

export default SubscribeToAlerts;
