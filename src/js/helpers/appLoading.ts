import store from '../store/index';
import { renderModal, setLanguage } from '../store/appState/actions';
import resources from '../../../configs/resources';

//Check the URL for report parameter
export function checkForReportView(): boolean {
  const reportURLParam = new URL(window.location.href).searchParams.get('report');
  return reportURLParam ? reportURLParam === 'true' : false;
}

export function loadDefaultGoogleAnalytics(analyticsCode): void {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');

  // fallback for old analytics code format (ga:UA-123456-1)
  if (analyticsCode.includes('UA-')) {
    script.innerHTML =
      "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
      '  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
      '  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n' +
      "  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n" +
      ' \n' +
      `  ga('create', '${analyticsCode}', 'auto');\n` +
      "  ga('send', 'pageview');";
    head.appendChild(script);
  } else {
    // new Google Analytics 4 code format (GTM-XXXXXXX)
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
      `  })(window, document, 'script', 'dataLayer', '${analyticsCode}');`;

    head.appendChild(script);

    const body = document.getElementsByTagName('body')[0];
    const noscript = document.createElement('noscript');
    body.appendChild(noscript);

    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${analyticsCode}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  }
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
