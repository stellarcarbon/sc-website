/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SEP10ChallengeResponse } from '../models/SEP10ChallengeResponse';
import type { SEP10TokenResponse } from '../models/SEP10TokenResponse';
import type { ValidateChallengeBody } from '../models/ValidateChallengeBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Request a SEP-10 challenge transaction to prove ownership of an account.
     * @returns SEP10ChallengeResponse Successful Response
     * @throws ApiError
     */
    public static getSep10Challenge({
        account,
        memo,
        homeDomain = 'testnet-api.stellarcarbon.io',
        clientDomain,
    }: {
        account: string,
        memo?: (number | null),
        homeDomain?: string,
        clientDomain?: (string | null),
    }): CancelablePromise<SEP10ChallengeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/sep-10',
            query: {
                'account': account,
                'memo': memo,
                'home_domain': homeDomain,
                'client_domain': clientDomain,
            },
            errors: {
                400: `Credentials or challenge failed to validate.`,
                410: `Data requested from Horizon is before recorded history`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
                503: `Horizon's historical database is too stale`,
                504: `Horizon could not confirm transaction inclusion (check network conditions)`,
            },
        });
    }
    /**
     * Submit the signed SEP-10 challenge transaction to receive a JWT.
     * @returns SEP10TokenResponse Successful Response
     * @throws ApiError
     */
    public static validateSep10Challenge({
        transaction,
        requestBody,
    }: {
        transaction?: (string | null),
        requestBody?: (ValidateChallengeBody | null),
    }): CancelablePromise<SEP10TokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/sep-10',
            query: {
                'transaction': transaction,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Credentials or challenge failed to validate.`,
                410: `Data requested from Horizon is before recorded history`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
                503: `Horizon's historical database is too stale`,
                504: `Horizon could not confirm transaction inclusion (check network conditions)`,
            },
        });
    }
}
