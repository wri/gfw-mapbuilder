import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import React, {Component, PropTypes} from 'react';

export default class SubscriptionModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };


  subscriptionMap (subscription) {
    return (
      <p className='source-row'>
        <span>{subscription.attributes.name}</span>
        <span>{subscription.attributes.createdAt}</span>
      </p>
    );
  }

  close = () => {
    mapActions.toggleLayerModal({ visible: false });
  };

  render () {
    // const {language} = this.context;
    const {userSubscriptions} = this.props;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <p>Subscriptions</p>
        {userSubscriptions.map(this.subscriptionMap)}
      </ControlledModalWrapper>
    );
  }

}
