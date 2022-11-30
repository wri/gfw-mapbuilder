import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store/index';
import { getShareableURL } from '../../../js/helpers/shareFunctionality';
import '../../../css/printButton.scss';
import { handleCustomColorTheme } from '../../../utils';

const printReportTranslations = {
  fr: 'Imprimer le Rapport',
  es: 'Imprimir Informe',
  pt: 'Imprimir Relatóro',
  id: 'Print Report',
  zh: '打印报告',
  en: 'Print Report',
  hy: 'Տպել արդյունքները',
  ka: 'ანგარიშის ბეჭდვა',
  nl: 'Rapport afdrukken',
};

export const PrintReportButton = (): JSX.Element => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);

  const themeColor = handleCustomColorTheme(customColorTheme);

  async function printReportHandler(): Promise<void> {
    const appID = new URL(window.location.href).searchParams.get('appid');
    const baseURL = new URL(window.location.href);
    let combinedReportURL = baseURL.origin + baseURL.pathname;
    const stateUrl = await getShareableURL({ report: true });

    combinedReportURL = appID
      ? combinedReportURL + '?' + 'appid=' + appID + '&' + stateUrl
      : combinedReportURL + '?' + stateUrl;

    window.open(combinedReportURL);
  }

  return (
    <button className="print-button" onClick={printReportHandler} style={{ border: `1px solid ${themeColor}` }}>
      {printReportTranslations[selectedLanguage]}{' '}
      <img src="https://my.gfw-mapbuilder.org/img/print-icon.svg" alt="print" />
    </button>
  );
};
