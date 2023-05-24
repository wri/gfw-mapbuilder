import store from '../store/index';
import { setLanguage, renderModal } from '../../js/store/appState/actions';
import resources from '../../../configs/resources';
//Check the URL for report parameter
export function checkForReportView(): boolean {
  const reportURLParam = new URL(window.location.href).searchParams.get('report');
  const reportIsActive = reportURLParam ? reportURLParam === 'true' : false;
  return reportIsActive;
}

export function loadGoogleAnalytics(analyticsCode?: string): void {
  console.log(analyticsCode);
  // WRI analytics code
  analyticsCode = 'GTM-TJFZWSB';
  // Personal analytics code
  analyticsCode = 'G-JR250CKBW8';

  // if (!window.hasOwnProperty('ga') || !analyticsCode) {
  //   return;
  // }
  // window['ga']('create', analyticsCode, 'auto');
  // window['ga']('send', 'pageview');

  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');

  script.innerHTML =
    '(function (w, d, s, l, i) {\n' +
    '    w[l] = w[l] || [];\n' +
    '    w[l].push({\n' +
    "      'gtm.start': new Date().getTime(),\n" +
    "      event: 'gtm.js',\n" +
    '    });\n' +
    '    var f = d.getElementsByTagName(s)[0],\n' +
    '      j = d.createElement(s),\n' +
    "      dl = l != 'dataLayer' ? '&l=' + l : '';\n" +
    '    j.async = true;\n' +
    "    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;\n" +
    '    f.parentNode.insertBefore(j, f);\n' +
    "  })(window, document, 'script', 'dataLayer', 'GTM-TJFZWSB');";
  head.appendChild(script);

  const body = document.getElementsByTagName('body')[0];
  const noscript = document.createElement('noscript');
  body.appendChild(noscript);

  noscript.innerHTML =
    '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJFZWSB" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
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
  window.addEventListener('listenToThisSubscriptionCall', handleExternalSubscriptionCall);
}
