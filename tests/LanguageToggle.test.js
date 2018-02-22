import React from 'react';
import { shallow } from 'enzyme';
import Navigation from 'components/Navigation/Navigation';
import LanguageToggle from 'components/Navigation/LanguageToggle';


describe('<Navigation />', () => {
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
      useAlternativeLanguage: false
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

  it('should Not render <LanguageToggle /> when useAlternativeLanguage is false', () => {
    const wrapper = shallow(<Navigation />, { context });
    wrapper.setContext(context);
    expect(wrapper.contains(<LanguageToggle />)).toEqual(false);
  });

  it('should render <LanguageToggle /> when useAlternativeLanguage is true', () => {
    context.settings.useAlternativeLanguage = true;
    const wrapper = shallow(<Navigation />, { context });
    wrapper.setContext(context);
    console.log(wrapper.debug());
    expect(wrapper.contains(<LanguageToggle />)).toEqual(true);
  });

  it('LanguageToggle should display an option for each language when useAlternativeLanguage is true', () => {
    context.settings.useAlternativeLanguage = true;
    const wrapper = shallow(<LanguageToggle />, { context });
    wrapper.setContext(context);

    const englishLang = wrapper.find('li.app-header__language').at(0);
    expect(englishLang.text()).toEqual('English');
    const frenchLang = wrapper.find('li.app-header__language').at(1);
    expect(frenchLang.text()).toEqual('Français');
  });

  it('LanguageToggle should show the new language as active when our context updates', () => {
    context.settings.useAlternativeLanguage = true;
    const wrapper = shallow(<LanguageToggle />, { context });
    wrapper.setContext(context);

    const frenchLang = wrapper.find('li.app-header__language').at(1);
    expect(frenchLang.hasClass('active')).toEqual(false);

    // frenchLang.simulate('click');
    context.language = 'fr';

    const frenchWrapper = shallow(<LanguageToggle />, { context });
    frenchWrapper.setContext(context);

    const activeFrench = frenchWrapper.find('li.app-header__language').at(1);
    expect(activeFrench.hasClass('active')).toEqual(true);
  });

});
