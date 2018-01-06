import React from 'react';
import Loader from 'components/Loader';
import renderer from 'react-test-renderer';

describe('resources layer spec', () => {

  it('renders correctly while active', () => {
    const tree = renderer
      .create(<Loader active={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly while static', () => {
    const tree = renderer
      .create(<Loader active={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
