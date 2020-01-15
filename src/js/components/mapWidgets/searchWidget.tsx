import React, { FunctionComponent, useState } from 'react';

import { ReactComponent as SearchIcon } from '../../../images/searchIcon.svg';

const SearchWidget: FunctionComponent = () => {
  const [searchARIA, setSearchARIA] = useState(false);

  const setSearch = () => {
    setSearchARIA(!searchARIA);
    // TODO - onClick, dispatch to actionCreator to render Modal
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={searchARIA}
          onClick={() => setSearch()}
        >
          <SearchIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default SearchWidget;
