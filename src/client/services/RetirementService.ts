/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RetirementDetail } from '../models/RetirementDetail';
import type { RetirementListResponse } from '../models/RetirementListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RetirementService {
    /**
     * List finalized retirements.
     * @returns RetirementListResponse Successful Response
     * @throws ApiError
     */
    public static getRetirementList({
        forBeneficiary,
        fromDate,
        beforeDate,
        project,
        cursor,
        limit,
        order = 'desc',
    }: {
        forBeneficiary?: (string | null),
        fromDate?: (string | null),
        beforeDate?: (string | null),
        project?: (number | null),
        cursor?: (number | string | null),
        limit?: (number | null),
        order?: 'asc' | 'desc',
    }): CancelablePromise<RetirementListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/retirements/',
            query: {
                'for_beneficiary': forBeneficiary,
                'from_date': fromDate,
                'before_date': beforeDate,
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
    /**
     * Fetch a single retirement and its instrument details.
     * @returns RetirementDetail Successful Response
     * @throws ApiError
     */
    public static getRetirementItem({
        certificateId,
    }: {
        /**
         * The retirement's certificate ID
         */
        certificateId: number,
    }): CancelablePromise<RetirementDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/retirements/{certificate_id}',
            path: {
                'certificate_id': certificateId,
            },
            errors: {
                400: `The request you sent was invalid in some way`,
                404: `Retirement was not found in our database`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
            },
        });
    }
}
