/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SinkTxItem } from './SinkTxItem';
export type SinkTxListResponse = {
    retirement_grace_days: number;
    total_carbon_sunk: string;
    total_carbon_retired: string;
    total_carbon_pending: string;
    transactions: Array<SinkTxItem>;
};

