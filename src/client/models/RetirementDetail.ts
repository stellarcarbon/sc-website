/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InstrumentItem } from './InstrumentItem';
import type { RetiredFromBlock } from './RetiredFromBlock';
import type { SinkTxSummary } from './SinkTxSummary';
import type { VcsProjectDetail } from './VcsProjectDetail';
export type RetirementDetail = {
    certificate_id: number;
    registry_url: string;
    vcu_amount: number;
    serial_number: string;
    retirement_date: string;
    beneficiary: string;
    details: string;
    vcs_project: VcsProjectDetail;
    instrument: InstrumentItem;
    retired_from: Array<RetiredFromBlock>;
    sink_statuses: Array<SinkTxSummary>;
};

