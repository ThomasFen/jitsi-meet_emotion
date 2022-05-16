// @flow
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Switch } from '../../../base/react';


const useStyles = makeStyles(theme => {
    return {
        switchContainer: {
            display: 'flex',
            alignItems: 'center',
            '& svg': {
                display: 'none'

            },
            '& div': {
                width: 38,
                '& > label': {
                    width: 32,
                    height: 20,
                    backgroundColor: theme.palette.ui05,
                    '&:not([data-checked]):hover': {
                        backgroundColor: theme.palette.ui05
                    },
                    '&[data-checked]': {
                        backgroundColor: theme.palette.action01,
                        '&:hover': {
                            backgroundColor: theme.palette.action01
                        },
                        '&::before': {
                            margin: '0 0 1.5px -3px',
                            backgroundColor: theme.palette.text01
                        }
                    },
                    '&:focus-within': {
                        borderColor: 'transparent'
                    },
                    '&::before': {
                        width: 14,
                        height: 14,
                        margin: '0 0 1.5px 1.5px',
                        backgroundColor: theme.palette.text01
                    }
                }
            }
        },
        switchLabel: {
            marginRight: 10,
            ...theme.typography.bodyShortRegular,
            lineHeight: `${theme.typography.bodyShortRegular.lineHeight}px`
        }
    };
});

/**
 * The type of the React {@code Component} props .
 */
type Props = {

    /**
     * The function to initiate the change in the speaker stats table.
     */
    onChange: Function,


};

