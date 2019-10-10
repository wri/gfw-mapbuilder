import React, { Component, PropTypes } from 'react';
import mapActions from 'actions/MapActions';

export default class AGOLBasemap extends Component {

    static contextTypes = {
        language: PropTypes.string.isRequired,
        map: PropTypes.object.isRequired
    };

    changeBasemap = () => {
        mapActions.changeBasemap('agol');
    }

    render() {
        const { active, label, icon } = this.props;
        const classes = `layer-basemap ${active ? 'selected' : ''}`;

        return (
            <div className={classes} onClick={this.changeBasemap}>
                <span className='layer-basemap-icon wri'><img src={`${icon}`} /></span>
                <span className='layer-basemap-label'>{label}</span>
            </div>
        );
    }
}

AGOLBasemap.propTypes = {
    icon: PropTypes.string.isRequired, //TODO: Get an image!
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};
