// @flow

import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { getParticipantById } from "../../../base/participants";
import { Label } from "../../../base/label";
import { COLORS } from "../../../base/label/constants";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import BaseTheme from "../../../base/ui/components/BaseTheme";
import { emotionToIcon } from "../../functions";



const EmotionsLabel = () => {
    // const conference = useSelector(
    //     (state) => state["features/base/conference"].conference
    // );
    // const { stats: speakerStats } = useSelector(
    //     (state) => state["features/speaker-stats"]
    // );
    const { tileViewEnabled } = useSelector(
        (state) => state["features/video-layout"]
    );
    const largeVideoParticipantId = useSelector(
        (state) => state["features/large-video"].participantId
    );

    const largeVideoParticipant =
        getParticipantById(APP.store.getState(), largeVideoParticipantId);
            

    const largeVideoParticipantJwtId = largeVideoParticipant?.jwtId;
    const largeVideoParticipantIsPhysician = largeVideoParticipant?.isPhysician;

    const largeVideoParticipantEmotion = useSelector(
        (state) =>
            state["features/emotion-recognition"].emotions[largeVideoParticipantJwtId]
    );
    const emotionIcon = emotionToIcon(largeVideoParticipantEmotion);
    // const getLocalSpeakerStats = useCallback(() => {
    //     const stats = conference.getSpeakerStats();

    //     for (const userId in stats) {
    //         if (stats[userId]) {
    //             if (stats[userId].isLocalStats()) {
    //                 const meString = t('me');

    //                 stats[userId].setDisplayName(
    //                     localParticipant.name
    //                         ? `${localParticipant.name} (${meString})`
    //                         : meString
    //                 );
    //                 if (enableDisplayFacialExpressions) {
    //                     stats[userId].setFacialExpressions(localFacialExpressions);
    //                 }
    //             }

    //             if (!stats[userId].getDisplayName()) {
    //                 stats[userId].setDisplayName(
    //                     conference.getParticipantById(userId)?.name
    //                 );
    //             }
    //         }
    //     }

    //     return stats;
    // });

    // const localSpeakerStats = Object.keys(speakerStats).length === 0 ? getLocalSpeakerStats() : speakerStats;
    // const userIds = Object.keys(localSpeakerStats).filter(id => localSpeakerStats[id] && !localSpeakerStats[id].hidden);
    // const dominantSpeaker = userIds.find(userId => localSpeakerStats[userId].isDominantSpeaker());
    // const dominantSpeakerStats = localSpeakerStats[dominantSpeaker];

    // const localSpeakerStats = speakerStats;
    // const userIds = Object.keys(localSpeakerStats).filter(
    //     (id) => localSpeakerStats[id] && !localSpeakerStats[id].hidden
    // );
    // const dominantSpeaker = userIds.find((userId) =>
    //     localSpeakerStats[userId].isDominantSpeaker()
    // );

    if (tileViewEnabled) {
        return null;
    }
    return (
        <Tooltip content={"emotion"} position="bottom">
            <Label
                color={COLORS.transparent}
                iconSize={"40"}
                icon={emotionIcon}
                id={"emotionLabel"}
                iconColor={BaseTheme.palette.uiBackground}
            />
        </Tooltip>
    );
};

export default EmotionsLabel;
