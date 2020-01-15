import React, { FunctionComponent } from 'react';

import { ReactComponent as SearchIcon } from '../../../images/searchIcon.svg';

const SearchWidget: FunctionComponent = () => {
  // const [openWidget, setOpenWidget] = useState(false);
  // ? should aria-pressed be maintained via Redux state, or local component state?

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={true} //openWidget goes here
          onClick={() => console.log('Redux goes here!')}
        >
          <SearchIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default SearchWidget;
