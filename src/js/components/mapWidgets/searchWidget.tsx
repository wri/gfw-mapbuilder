import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { renderModal } from '../../store/appState/actions';

import { ReactComponent as SearchIcon } from '../../../images/searchIcon.svg';

const SearchWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="search widget"
          onClick={() => dispatch(renderModal('SearchWidget'))}
        >
          <SearchIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default SearchWidget;
