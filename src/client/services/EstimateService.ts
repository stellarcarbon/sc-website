/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CabinClass } from '../models/CabinClass';
import type { FlightEstimateResponse } from '../models/FlightEstimateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EstimateService {
    /**
     * Estimate the CO2 emissions for a flight between two airports.
     * @returns FlightEstimateResponse Successful Response
     * @throws ApiError
     */
    public static getFlightEstimate({
        departure,
        destination,
        cabinClass,
        tripType = 'round-trip',
    }: {
        departure: string,
        destination: string,
        cabinClass?: CabinClass,
        tripType?: 'one-way' | 'round-trip',
    }): CancelablePromise<FlightEstimateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/estimate/flight',
            query: {
                'departure': departure,
                'destination': destination,
                'cabin_class': cabinClass,
                'trip_type': tripType,
            },
            errors: {
                400: `The request you sent was invalid in some way`,
                404: `Airport not found. Unknown IATA code.`,
                422: `Validation Error`,
                500: `An unhandled error occurred on the server`,
            },
        });
    }
}
