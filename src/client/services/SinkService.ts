/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SinkTxItem } from '../models/SinkTxItem';
import type { SinkTxListResponse } from '../models/SinkTxListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SinkService {
    /**
     * List sinking transactions and their retirement status.
     * @returns SinkTxListResponse Successful Response
     * @throws ApiError
     */
    public static getSinkTxList({
        forFunder,
        forRecipient,
        fromDate,
        beforeDate,
        finalized,
        cursor,
        limit,
        order = 'desc',
    }: {
        forFunder?: (string | null),
        forRecipient?: (string | null),
        fromDate?: (string | null),
        beforeDate?: (string | null),
        finalized?: (boolean | null),
        cursor?: (number | null),
        limit?: (number | null),
        order?: 'asc' | 'desc',
    }): CancelablePromise<SinkTxListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sink-txs/',
            query: {
                'for_funder': forFunder,
                'for_recipient': forRecipient,
                'from_date': fromDate,
                'before_date': beforeDate,
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
     * Fetch a single sink transaction and its retirement status.
     * @returns SinkTxItem Successful Response
     * @throws ApiError
     */
    public static getSinkTxItem({
        txHash,
    }: {
        /**
         * The sink transaction hash (64 hexadecimal characters)
         */
        txHash: string,
    }): CancelablePromise<SinkTxItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sink-txs/{tx_hash}',
            path: {
                'tx_hash': txHash,
            },
            errors: {
                400: `The request you sent was invalid in some way`,
                404: `Transaction was not found in our database`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
            },
        });
    }
}
