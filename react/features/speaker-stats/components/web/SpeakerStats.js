// @flow

import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog } from '../../../base/dialog';
import { escapeRegexp } from '../../../base/util';
import { resetSearchCriteria, initSearch } from '../../actions';
import {
    DISPLAY_SWITCH_BREAKPOINT,
    MOBILE_BREAKPOINT,
    RESIZE_SEARCH_SWITCH_CONTAINER_BREAKPOINT
} from '../../constants';


import SpeakerStatsLabels from './SpeakerStatsLabels';
import SpeakerStatsList from './SpeakerStatsList';
import SpeakerStatsSearch from './SpeakerStatsSearch';

const useStyles = makeStyles(theme => {
    return {
        footer: {
            display: 'none !important'
        },
        labelsContainer: {
            position: 'relative'
        },
        separator: {
            position: 'absolute',
            width: 'calc(100% + 48px)',
            height: 1,
            left: -24,
            backgroundColor: theme.palette.border02
        },
        searchSwitchContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        searchSwitchContainerExpressionsOn: {
            width: '58.5%',
            [theme.breakpoints.down(RESIZE_SEARCH_SWITCH_CONTAINER_BREAKPOINT)]: {
                width: '100%'
            }
        },
        searchContainer: {
            width: '50%'
        },
        searchContainerFullWidth: {
            width: '100%'
        }
    };
});

const SpeakerStats = () => {
   
   
    const { clientWidth } = useSelector(state => state['features/base/responsive-ui']);
    const displayLabels = clientWidth > MOBILE_BREAKPOINT;
    const dispatch = useDispatch();
    const classes = useStyles();

  

    const onSearch = useCallback((criteria = '') => {
        dispatch(initSearch(escapeRegexp(criteria)));
    }
    , [ dispatch ]);


    useEffect(() => () => dispatch(resetSearchCriteria()), []);

    return (
        <Dialog
            cancelKey = 'dialog.close'
            classes = {{ footer: classes.footer }}
            hideCancelButton = { true }
            submitDisabled = { true }
            titleKey = 'speakerStats.speakerStats'
            width = { 'small' }>
            <div className = 'speaker-stats'>
                <div
                    className = {
                        `${classes.searchSwitchContainer}
                        ${''}`
                    }>
                    <div
                        className = {
                           classes.searchContainerFullWidth }>
                        <SpeakerStatsSearch
                            onSearch = { onSearch } />
                    </div>

              
                </div>
                { displayLabels && (
                    <div className = { classes.labelsContainer }>
                        <SpeakerStatsLabels
                            />
                        <div className = { classes.separator } />
                    </div>
                )}
                <SpeakerStatsList />
            </div>
        </Dialog>

    );
};

export default SpeakerStats;
