/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VerraRetirementItem } from './VerraRetirementItem';
export type VerraRetirementsResponse = {
    total_count: number;
    count_exceeded: boolean;
    total_amount_retired: number;
    retirements: Array<VerraRetirementItem>;
};

