import React from 'react';
import { shallow } from 'enzyme';
import Header from 'components/Header';


describe('<Header />', () => {
  const context = {
    language: 'en',
    settings: {
      title: 'GFW Mapbuilder',
      subtitle: 'Make maps that matter',
      language: 'en',
      alternativeWebmap: 'fb2a95fe3d684b1a817d7bf96ccd5cd3',
      alternativeLanguage: 'fr',
      alternativeLanguageTitle: 'French Title',
      alternativeLanguageSubtitle: 'Make maps that Frenchie',
      useAlternativeLanguage: false,
      logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
      logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
      hideHeader: false
    }
  };

  context.settings.labels = {};
  context.settings.labels[context.settings.language] = {
    title: context.settings.title,
    subtitle: context.settings.subtitle,
    webmapMenuName: context.settings.webmapMenuName
  };

  context.settings.labels[context.settings.alternativeLanguage] = {
    title: context.settings.alternativeLanguageTitle,
    subtitle: context.settings.alternativeLanguageSubtitle,
    webmapMenuName: context.settings.alternativeWebmapMenuName || context.settings.webmapMenuName
  };


  it('Header should show the new language as active when our context updates', () => {
    const wrapper = shallow(<Header />, { context });
    wrapper.setContext(context);

    expect(wrapper.find('a[href="https://www.gfw-mapbuilder.org/"]')).toHaveLength(1);
    expect(wrapper.find('img[src="https://my.gfw-mapbuilder.org/img/gfw-logo.png"]')).toHaveLength(1);

    const header = wrapper.find('div.app-header').at(0);
    expect(header.hasClass('hidden')).toEqual(false);

    const title = wrapper.find('div.app-header__title').at(0);
    expect(title.text()).toEqual('GFW Mapbuilder');
    const subtitle = wrapper.find('div.app-header__subtitle').at(0);
    expect(subtitle.text()).toEqual('Make maps that matter');

    context.settings.useAlternativeLanguage = true;
    context.language = 'fr';

    const frenchWrapper = shallow(<Header />, { context });
    frenchWrapper.setContext(context);

    const frenchTitle = frenchWrapper.find('div.app-header__title').at(0);
    expect(frenchTitle.text()).toEqual('French Title');
    const frenchSubtitle = frenchWrapper.find('div.app-header__subtitle').at(0);
    expect(frenchSubtitle.text()).toEqual('Make maps that Frenchie');

    context.settings.hideHeader = true;

    const hiddenWrapper = shallow(<Header />, { context });
    hiddenWrapper.setContext(context);

    const hiddenHeader = hiddenWrapper.find('div.app-header').at(0);
    expect(hiddenHeader.hasClass('hidden')).toEqual(true);
  });

});
