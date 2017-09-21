import mapActions from 'actions/MapActions';
import React from 'react';

const closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class LayerGroup extends React.Component {

  render() {
    const {activeTOCGroup, groupKey} = this.props;
    const active = activeTOCGroup === groupKey;

    return (
      <div className='layer-category'>
        <div className='layer-category-label pointer' onClick={this.toggle} title={this.props.label}>
          {this.props.label}
          <span className='layer-category-caret'>{String.fromCharCode(active ? closeSymbolCode : openSymbolCode)}</span>
        </div>
        <div className={`layer-category-content ${active ? '' : 'closed'}`}>{this.props.children}</div>
      </div>
    );
  }

  toggle = () => {
    const {activeTOCGroup, groupKey} = this.props;
    const updatedKey = activeTOCGroup === groupKey ? '' : groupKey;
    mapActions.openTOCAccordion(updatedKey);
  };

}

LayerGroup.propTypes = {
  label: React.PropTypes.string.isRequired
};
