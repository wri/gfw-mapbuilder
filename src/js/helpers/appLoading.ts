import store from '../store/index';
import { setLanguage, renderModal } from 'js/store/appState/actions';
import resources from '../../../configs/resources';
//Check the URL for report parameter
export function checkForReportView(): boolean {
  const reportURLParam = new URL(window.location.href).searchParams.get(
    'report'
  );
  const reportIsActive = reportURLParam ? reportURLParam === 'true' : false;
  return reportIsActive;
}

export function loadGoogleAnalytics(analyticsCode?: string): void {
  if (!window.hasOwnProperty('ga') || !analyticsCode) {
    return;
  }
  window['ga']('create', analyticsCode, 'auto');
  window['ga']('send', 'pageview');
}

export function changeDefaultLanguage(passedLanguage?: string): void {
  //Check URL for language param which comes in after user shares the application.
  const langFromURL = new URL(window.location.href).searchParams.get('l');

  if (langFromURL) {
    store.dispatch(setLanguage(langFromURL));
  } else {
    //set the language based on appid info, if nothing is set, just default to resources.js
    store.dispatch(setLanguage(passedLanguage || resources.language));
  }
}

//This sets up the event listener that gets fired by CMS codebase when user click on CMS AOI Dashboard dropdown
export function attachCMSEventHandlers(): void {
  const handleExternalSubscriptionCall = (): void => {
    store.dispatch(renderModal('AOIDashboard'));
  };
  window.addEventListener(
    'listenToThisSubscriptionCall',
    handleExternalSubscriptionCall
  );
}
