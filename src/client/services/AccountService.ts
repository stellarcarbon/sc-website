/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RetirementListResponse } from '../models/RetirementListResponse';
import type { SinkTxListResponse } from '../models/SinkTxListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountService {
    /**
     * List sinking transactions for the given recipient account.
     * @returns SinkTxListResponse Successful Response
     * @throws ApiError
     */
    public static getSinkTxsForRecipient({
        recipientAddress,
        finalized,
        cursor,
        limit,
        order = 'desc',
    }: {
        recipientAddress: string,
        finalized?: (boolean | null),
        cursor?: (number | string | null),
        limit?: (number | null),
        order?: 'asc' | 'desc',
    }): CancelablePromise<SinkTxListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recipients/{recipient_address}/sink-txs',
            path: {
                'recipient_address': recipientAddress,
            },
            query: {
                'finalized': finalized,
                'cursor': cursor,
                'limit': limit,
                'order': order,
            },
            errors: {
                400: `The request you sent was invalid in some way`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
            },
        });
    }
    /**
     * List finalized retirements for the given beneficiary account.
     * @returns RetirementListResponse Successful Response
     * @throws ApiError
     */
    public static getRetirementsForBeneficiary({
        beneficiaryAddress,
        project,
        cursor,
        limit,
        order = 'desc',
    }: {
        beneficiaryAddress: string,
        project?: (number | null),
        cursor?: (number | string | null),
        limit?: (number | null),
        order?: 'asc' | 'desc',
    }): CancelablePromise<RetirementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recipients/{beneficiary_address}/retirements',
            path: {
                'beneficiary_address': beneficiaryAddress,
            },
            query: {
                'project': project,
                'cursor': cursor,
                'limit': limit,
                'order': order,
            },
            errors: {
                400: `The request you sent was invalid in some way`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
            },
        });
    }
}
