import modalActions from 'actions/ModalActions';
import modalStore from 'stores/ModalStore';
import ReactDOM from 'react-dom';
import cookie from 'dojo/cookie';
import React from 'react';

export default class LandingModal extends React.Component {
  constructor(props) {
    super(props);

    modalStore.listen(this.storeUpdated.bind(this));
    const defaultState = modalStore.getState();

    this.state = {
      checked: false,
      layerInfo: defaultState.modalLayerInfo
    };
  }

  handleClick = () => {
    this.setState(prevState => {
      return { checked: !prevState.checked };
    });
  }

  storeUpdated () {
    const currentState = modalStore.getState();
    this.setState({ layerInfo: currentState.modalLayerInfo });
  }

  close () {
    if (this.state.checked) {
      cookie('showLandingModal', 'false');
    }
    modalActions.hideModal(ReactDOM.findDOMNode(this).parentElement);
  }

  render() {
    const {theme} = this.props;
    const contentClass = `mapbuilder-modal-content custom-scroll ${theme ? theme : ''}`;

    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={::this.close} />
        <article className='modal-boxaa shadow'>
          <div title='close' className='close-icon pointer' onClick={::this.close} >
            <svg><use xlinkHref="#shape-close" /></svg>
          </div>
            <div className={contentClass}>
            <div className='landing-modal-header' />
            <div>
              LandMark is a work in progress. New maps and information are continuously added to the platform, but many gaps remain. <strong>Note that the absence of data does not indicate the absence of indigenous or community land.</strong> Please help us to improve the completeness of the platform by sharing your information on indigenous and community lands (<a href='http://www.landmarkmap.org/map/contact-us/' target='_blank'>Contact Us</a>).
            </div>
            <div onClick={this.handleClick} className='landing-modal-checkbox-container pointer'>
              <input type='checkbox' checked={this.state.checked} />
              <span>&nbsp;Don&apos;t show this dialog again</span>
            </div>
            </div>
        </article>
      </div>
    );
  }
}
