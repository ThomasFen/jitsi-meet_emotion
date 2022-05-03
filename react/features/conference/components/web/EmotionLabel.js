// @flow

import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { getParticipantById } from "../base/participants";

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
import { Label } from "../../../base/label";
import { COLORS } from "../../../base/label/constants";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import BaseTheme from "../../../base/ui/components/BaseTheme";

function _emotionToIcon(emotion) {
    switch (emotion) {
        case "anger":
            return IconEmotionAnger;
        case "contempt":
            return IconEmotionContempt;
        case "disgust":
            return IconEmotionDisgust;
        case "fear":
            return IconEmotionFear;
        case "happy":
            return IconEmotionHappy;
        case "neutral":
            return IconEmotionNeutral;
        case "sad":
            return IconEmotionSad;
        case "surprise":
            return IconEmotionSursprise;

        default:
            return null;
    }
}

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

    const largeVideoParticipantJwtId =
        getParticipantById(APP.store.getState(), largeVideoParticipantId)
            ?.jwtId ?? "-1";
    const largeVideoParticipantEmotion = useSelector(
        (state) =>
            state["features/emotion-recognition"][largeVideoParticipantJwtId]
    );
    const emotionIcon = _emotionToIcon(largeVideoParticipantEmotion);
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
