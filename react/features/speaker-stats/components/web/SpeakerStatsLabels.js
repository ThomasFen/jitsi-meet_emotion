/* @flow */
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '../../../base/tooltip';


const useStyles = makeStyles(theme => {
    return {
        labels: {
            padding: '22px 0 7px 0',
            height: 20
        },
        emojis: {
            paddingLeft: 27,
            ...theme.typography.bodyShortRegularLarge,
            lineHeight: `${theme.typography.bodyShortRegular.lineHeightLarge}px`
        }
    };
});

/**
 * The type of the React {@code Component} props of {@link SpeakerStatsLabels}.
 */
type Props = {


};

const SpeakerStatsLabels = (props: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const nameTimeClass = `name-time${
        ''
    }`;

    return (
        <div className = { `row ${classes.labels}` }>
            <div className = 'avatar' />

            <div className = { nameTimeClass }>
                <div>
                    { t('speakerStats.name') }
                </div>
                <div>
                    { t('speakerStats.speakerTime') }
                </div>
            </div>
         
        </div>
    );
};

export default SpeakerStatsLabels;
