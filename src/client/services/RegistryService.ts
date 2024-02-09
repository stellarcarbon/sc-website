/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryResponse } from '../models/InventoryResponse';
import type { RetirementsResponse } from '../models/RetirementsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RegistryService {
    /**
     * Get the list of Stellarcarbon retirements in the Verra Registry.
     * Fetch the list of finalized CARBON retirements from the Verra Registry.
     *
     * Return all retirements made to the Carbon Sink in the Verra Registry. All information on the
     * retired instruments and their retirement events is directly copied from Verra. We have added
     * a `total_amount_retired` field for convenience, to be able to quickly access the number of
     * tonnes for which Stellarcarbon has finalized their retirement in the registry.
     *
     * This endpoint can be slow to respond due to the upstream query that is done in the Verra Registry.
     * @returns RetirementsResponse Successful Response
     * @throws ApiError
     */
    public static listRetirementsRegistryRetirementsGet(): CancelablePromise<RetirementsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/registry/retirements',
            errors: {
                504: `Timeout querying the Verra Registry (8 seconds)`,
            },
        });
    }
    /**
     * Get the list of Stellarcarbon inventory batches in the Verra Registry.
     * Show Stellarcarbon's inventory held in the CARBON Pool in the Verra Registry.
     *
     * Return all batches of credits that are held in the CARBON Pool sub-account. These batches
     * include credits that can still be used as well as credits that have been sunk through
     * Stellarcarbon but whose retirement has yet to be finalized in the Verra Registry, e.g.
     * because of incomplete fractional retirements.
     *
     * The field `total_inventory_credits` contains the sum of all batches in the inventory.
     * @returns InventoryResponse Successful Response
     * @throws ApiError
     */
    public static listInventoryRegistryInventoryGet(): CancelablePromise<InventoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/registry/inventory',
            errors: {
                504: `Timeout querying the Verra Registry (5 seconds)`,
            },
        });
    }
}
