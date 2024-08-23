/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MintedBlockListResponse } from '../models/MintedBlockListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MintService {
    /**
     * List minted blocks (current and past inventory).
     * @returns MintedBlockListResponse Successful Response
     * @throws ApiError
     */
    public static getMintedBlockList({
        omitEmpty = false,
        untilDate,
    }: {
        omitEmpty?: boolean,
        untilDate?: (string | null),
    }): CancelablePromise<MintedBlockListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/minted-blocks/',
            query: {
                'omit_empty': omitEmpty,
                'until_date': untilDate,
            },
            errors: {
                400: `The request you sent was invalid in some way`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
            },
        });
    }
}
