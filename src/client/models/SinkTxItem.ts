/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DestAssetItem } from './DestAssetItem';
import type { MemoItem } from './MemoItem';
import type { RetirementSummary } from './RetirementSummary';
import type { SourceAssetItem } from './SourceAssetItem';
export type SinkTxItem = {
    hash: string;
    created_at: string;
    funder: string;
    recipient: string;
    carbon_amount: string;
    source_asset: SourceAssetItem;
    dest_asset: DestAssetItem;
    vcs_project_id: number;
    memo: MemoItem;
    paging_token: string;
    retirement_finalized: boolean;
    retirements: Array<RetirementSummary>;
};

