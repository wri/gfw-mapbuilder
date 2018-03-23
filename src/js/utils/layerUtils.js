import InfoTemplate from 'esri/InfoTemplate';
import esriRequest from 'esri/request';

export default {
  getLayerMetadata: (url) => {
    return esriRequest({
      url: url,
      content: {
        f: 'json'
      }
    });
  },

  /**
  * @param {object} config
  * @param {object} config.title - Title for the info template in a dictionary of ISO Codes
  * @param {object} config.content - Content for the info template in a dictionary of ISO Codes
  * @param {string} lang - ISO Code to use for the popup
  */
  makeInfoTemplate: (config, lang) => {
    let template = '<div class="esriViewPopup"><div class="mainSection">';
    const title = config.title[lang];
    const content = config.content[lang];
    //- Add the title
    if (title) {
      template += '<div class="header">' + title + '</div>';
    }
    //- Add the attr table
    template += '<table class="attrTable">';
    //- Add the content
    if (content) {
      content.forEach((row) => {
        template += '<tr><td class="attrName">' + row.label + '</td>' +
                    '<td class="attrValue">${' + row.fieldExpression + '}</td></tr>';
      });
    }
    //- Close the table and container, then return the template
    template += '</table></div></div>';
    return new InfoTemplate({
      content: template
    });
  }
};
