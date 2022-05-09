// @flow

import React, { Component } from "react";

import ContextMenuItem from "../../../base/components/context-menu/ContextMenuItem";
import { translate } from "../../../base/i18n";
import { IconMessage, IconCloseCircle } from "../../../base/icons";
import { connect } from "../../../base/redux";
import { openChat } from "../../../chat/";
import {
    _mapStateToProps as _abstractMapStateToProps,
    type Props as AbstractProps,
} from "../../../chat/components/web/PrivateMessageButton";
import { enableParticipantEmotions, disableParticipantEmotions } from "../../../emotion-recognition";


type Props = AbstractProps & {
    /**
     * True if the private chat functionality is disabled, hence the button is not visible.
     */
    _hidden: boolean,
    _emotionActive: boolean,
};

/**
 * A custom implementation of the PrivateMessageButton specialized for
 * the web version of the remote video menu. When the web platform starts to use
 * the {@code AbstractButton} component for the remote video menu, we can get rid
 * of this component and use the generic button in the chat feature.
 */
class EmotionMenuButton extends Component<Props> {
    /**
     * Instantiates a new Component instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onClick = this._onClick.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { t, _hidden, _participant, _emotionActive } = this.props;
        const patientJwtId = _participant.jwtId;
        const isPhysian = _participant.isPhysian;

        if (!patientJwtId || _hidden || isPhysian) {
            return null;
        }

        return (
            <ContextMenuItem
                accessibilityLabel={t(
                    "toolbar.accessibilityLabel.privateMessage"
                )}
                icon={_emotionActive ? IconCloseCircle : IconMessage}
                onClick={this._onClick}
                text={
                    _emotionActive
                        ? "Stop Detecting Emotions"
                        : "Start Detecting Emotions"
                }
            />
        );
    }

    _onClick: () => void;

    /**
     * Callback to be invoked on pressing the button.
     *
     * @returns {void}
     */
    _onClick() {
        const { dispatch, _emotionActive, _participant } = this.props;

       if(_emotionActive) {dispatch(disableParticipantEmotions(_participant));}
        else{
        dispatch(enableParticipantEmotions(_participant));
       }
    }
}

/**
 * Maps part of the Redux store to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the component.
 * @returns {Props}
 */
function _mapStateToProps(state: Object, ownProps: Props): $Shape<Props> {
    const participant = getParticipantById(state, ownProps.participantID);
    const { emotions } = state["features/emotion-recognition"];
    const { enableEmotionRecognition } = state["features/base/config"];

    return {
        _emotionActive: emotions[participant.jwtId],
        _hidden: enableEmotionRecognition,
        _participant: participant,

    };
}

export default translate(connect(_mapStateToProps)(EmotionMenuButton));
