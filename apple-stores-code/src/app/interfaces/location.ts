/**
 * Defines the expected data structure for each Apple Store Location
 * that is parsed in the subscribed Observable
 *
 * @export
 * @interface Location
 */
export interface Location {
    id: number;
    country: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    zoom: number;
    active: boolean;
}
