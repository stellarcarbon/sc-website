/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VcsProjectSummary } from './VcsProjectSummary';
export type MintedBlockItem = {
    serial_hash: string;
    size: number;
    credits_remaining?: (number | null);
    credits_remaining_on_date?: (number | null);
    transaction_hash: string;
    created_at: string;
    serial_number: string;
    sub_account_id: number;
    sub_account_name: string;
    vintage_start: string;
    vintage_end: string;
    vcs_project: VcsProjectSummary;
};

