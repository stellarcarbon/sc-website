/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MintedBlockItem } from './MintedBlockItem';
export type MintedBlockListResponse = {
    total_credits_minted?: (number | null);
    total_credits_remaining: number;
    minted_blocks: Array<MintedBlockItem>;
};

