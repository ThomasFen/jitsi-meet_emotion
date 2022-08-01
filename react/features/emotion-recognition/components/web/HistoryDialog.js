// @flow

import React from 'react';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import HistoryDialogContent from './HistoryDialogContent';


/**
 * Implements the Emotion History dialog.
 *
 * @param {Object} props - The props of the component.
 * @returns {React$Element}.
 */
function HistoryDialog(props: Props) {
    const { onChartUpdate, t } = props;

    return (
        <Dialog
        hideCancelButton = { true }
        // submitDisabled = { true }
            okKey = { 'Update Chart'} //t('dialog.Yes') 
            onSubmit = { onChartUpdate }
            titleKey = { 'Emotion Browser' } //t('dialog.logoutTitle')
            width = { 'x-large' }>
            <HistoryDialogContent>
              
            </HistoryDialogContent>
        </Dialog>
    );
}

export default translate(connect()(HistoryDialog));
