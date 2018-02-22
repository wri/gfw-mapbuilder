import React from 'react';
import { shallow, mount } from 'enzyme';
import Navigation from 'components/Navigation/Navigation';


describe('<Navigation />', () => {
  const context = {
    language: 'en',
    settings: {
      title: 'GFW Mapbuilder',
      subtitle: 'Make maps that matter',
      language: 'en',
      includeMyGFWLogin: false
    }
  };

  context.settings.labels = {};
  context.settings.labels[context.settings.language] = {
    title: context.settings.title,
    subtitle: context.settings.subtitle,
    webmapMenuName: context.settings.webmapMenuName
  };


  it('Navigation should display an option for each language when useAlternativeLanguage is true', () => {
    const wrapper = shallow(<Navigation />, { context });
    wrapper.setContext(context);

    expect(wrapper.find('li.app-header__nav-link--gfw-login')).toHaveLength(0);
    expect(wrapper.find('li.app-header__nav-link--gfw-logged-in')).toHaveLength(0);

    context.settings.includeMyGFWLogin = true;

    const updatedWrapper = shallow(<Navigation />, { context });
    updatedWrapper.setContext(context);

    expect(updatedWrapper.find('li.app-header__nav-link--gfw-login')).toHaveLength(1);
    expect(updatedWrapper.find('li.app-header__nav-link--gfw-logged-in')).toHaveLength(0);
    expect(updatedWrapper.find('li.app-header__nav-link--gfw-login').hasClass('login-open')).toEqual(false);

    updatedWrapper.setState({ loginsDisplayed: true });
    expect(updatedWrapper.find('li.app-header__nav-link--gfw-login')).toHaveLength(1);
    expect(updatedWrapper.find('li.app-header__nav-link--gfw-login').hasClass('login-open')).toEqual(true);

    updatedWrapper.setState({
      loginsDisplayed: false,
      isLoggedIn: true
    });

    expect(updatedWrapper.find('li.app-header__nav-link--gfw-login')).toHaveLength(0);
    expect(updatedWrapper.find('li.app-header__nav-link--gfw-logged-in')).toHaveLength(1);
    expect(updatedWrapper.find('li.app-header__nav-link--gfw-logged-in').hasClass('options-open')).toEqual(false);

    updatedWrapper.setState({ optionsDisplayed: true });
    expect(updatedWrapper.find('li.app-header__nav-link--gfw-logged-in').hasClass('options-open')).toEqual(true);

  });

});
