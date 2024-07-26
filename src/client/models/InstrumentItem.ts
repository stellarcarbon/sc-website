/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InstrumentItem = {
    issuance_date: string;
    instrument_type: InstrumentItem.instrument_type;
    vintage_start: string;
    vintage_end: string;
    total_vintage_quantity: number;
};
export namespace InstrumentItem {
    export enum instrument_type {
        VCU = 'VCU',
    }
}

