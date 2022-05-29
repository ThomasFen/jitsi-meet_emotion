// @flow

import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { Label } from "../../../base/label";
import { COLORS } from "../../../base/label/constants";
import { useSelector } from "react-redux";
import BaseTheme from "../../../base/ui/components/BaseTheme";
import { IconEmotionRecording } from "../../../base/icons";

const SendingLabel = () => {
    const isSending = useSelector(
        (state) =>
            state["features/emotion-recognition"].lastRequestTimestamp !==
            Number.MAX_SAFE_INTEGER
    );

    if(!isSending){
        return null;
    }

    return (
        <Tooltip
            content={"Your face is being analyzed for emotions."}
            position="bottom"
        >
            <Label
                color={COLORS.transparent}
                iconSize={"40"}
                icon={IconEmotionRecording}
                id={"SendingLabel"}
                iconColor={BaseTheme.palette.uiBackground}
            />
        </Tooltip>
    );
};

export default SendingLabel;
