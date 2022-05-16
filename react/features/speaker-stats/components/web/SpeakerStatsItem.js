/* @flow */

import React from 'react';

import { Avatar, StatelessAvatar } from '../../../base/avatar';
import { getInitials } from '../../../base/avatar/functions';
import BaseTheme from '../../../base/ui/components/BaseTheme';

import TimeElapsed from './TimeElapsed';

/**
 * The type of the React {@code Component} props of {@link SpeakerStatsItem}.
 */
type Props = {

    /**
     * The name of the participant.
     */
    displayName: string,


    /**
     * The total milliseconds the participant has been dominant speaker.
     */
    dominantSpeakerTime: number,

    /**
     * The id of the user.
     */
    participantId: string,

    /**
     * True if the participant is no longer in the meeting.
     */
    hasLeft: boolean,

    /**
     * True if the participant is not shown in speaker stats.
     */
    hidden: boolean,

    /**
     * True if the participant is currently the dominant speaker.
     */
    isDominantSpeaker: boolean,

    /**
     * Styles for the item.
     */
    styles: Object,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
}

const SpeakerStatsItem = (props: Props) => {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    const hasLeftClass = props.hasLeft ? props.styles.hasLeft : '';
    const rowDisplayClass = `row ${hasLeftClass} ${props.styles.item}`;
    const nameTimeClass = `name-time${
        ''
    }`;
    const timeClass = `${props.styles.time} ${props.isDominantSpeaker ? props.styles.dominant : ''}`;




    return (
        <div
            className = { rowDisplayClass }
            key = { props.participantId } >
            <div className = { `avatar ${props.styles.avatar}` }>
                {
                    props.hasLeft ? (
                        <StatelessAvatar
                            className = 'userAvatar'
                            color = { BaseTheme.palette.ui04 }
                            id = 'avatar'
                            initials = { getInitials(props.displayName) } />
                    ) : (
                        <Avatar
                            className = 'userAvatar'
                            participantId = { props.participantId } />
                    )
                }
            </div>
            <div className = { nameTimeClass }>
                <div
                    aria-label = { props.t('speakerStats.speakerStats') }
                    className = { props.styles.displayName }>
                    { props.displayName }
                </div>
                <div
                    aria-label = { props.t('speakerStats.speakerTime') }
                    className = { timeClass }>
                    <TimeElapsed
                        time = { props.dominantSpeakerTime } />
                </div>
            </div>
            
        </div>
    );
};

export default SpeakerStatsItem;
