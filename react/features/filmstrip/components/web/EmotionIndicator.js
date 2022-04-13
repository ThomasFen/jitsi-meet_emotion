/* @flow */

import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { COLORS } from "../../../base/label/constants";
import {
    IconEmotionAnger,
    IconEmotionContempt,
    IconEmotionHappy,
    IconEmotionDisgust,
    IconEmotionFear,
    IconEmotionNeutral,
    IconEmotionSad,
    IconEmotionSursprise,
} from "../../../base/icons";
import { getParticipantById, hasRaisedHand } from '../../../base/participants';
import { BaseIndicator } from '../../../base/react';
import BaseTheme from '../../../base/ui/components/BaseTheme';

/**
 * The type of the React {@code Component} props of {@link RaisedHandIndicator}.
 */
type Props = {

    /**
     * The font-size for the icon.
     */
    iconSize: number,

    /**
     * The participant id who we want to render the raised hand indicator
     * for.
     */
    participantId: string,

    /**
     * From which side of the indicator the tooltip should appear from.
     */
    tooltipPosition: string
};

const useStyles = makeStyles(theme => {
    return {
        EmotionIndicator: {
           // backgroundColor: COLORS.white,
            padding: '2px',
            zIndex: 3,
            display: 'inline-block',
            borderRadius: '4px',
            boxSizing: 'border-box'
        }
    };
});

/**
 * Thumbnail badge showing that the participant would like to speak.
 *
 * @returns {ReactElement}
 */
const EmotionIndicator = ({
    iconSize,
    participantId,
    tooltipPosition
}: Props) => {
    const _raisedHand = hasRaisedHand(useSelector(state =>
        getParticipantById(state, participantId)));
    const styles = useStyles();

    // if (!_raisedHand) {
    //     return null;
    // }

    return (
        <div className = { styles.EmotionIndicator }>
            <BaseIndicator
                icon = {_raisedHand ?IconEmotionAnger : IconEmotionHappy}
                iconColor = { BaseTheme.palette.uiBackground }
                iconSize = { `${iconSize}px` }
                tooltipKey = 'raisedHand'
                tooltipPosition = { tooltipPosition } />
        </div>
    );
};

export default EmotionIndicator;
