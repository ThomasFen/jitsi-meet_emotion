// @flow

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
import { subscribeToAllEmotions } from "../../../emotion-recognition";
import {
    getLocalParticipant
  
} from '../../../base/participants';
import {  IconEmotionEnable } from "../../../base/icons";

type Props = AbstractButtonProps & {

    /**
     * The URL to the user documentation.
     */

};

/**
 * Implements an {@link AbstractButton} to open the user documentation in a new window.
 */
class AllEmotionButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.allEmotions';
    icon = IconEmotionEnable;
    label = 'toolbar.allEmotions';
    tooltip = 'toolbar.allEmotions';

    /**
     * Handles clicking / pressing the button, and subsribes emotions of every patient in the conference.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch} = this.props;

        dispatch(subscribeToAllEmotions());
    }
}


/**
 * Maps part of the redux state to the component's props.
 *
 * @param {Object} state - The redux store/state.
 * @returns {Object}
 */
function _mapStateToProps(state: Object) {
    const { enableEmotionRecognition } = state["features/base/config"];
    const { isPhysician} = getLocalParticipant(state);
    const visible = enableEmotionRecognition && isPhysician;

    return {
        visible
    };
}

export default translate(connect(_mapStateToProps)(AllEmotionButton));
