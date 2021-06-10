/**
 * Defines the expected data structure for each Apple Store Location
 * to be rendered to the component template
 *
 * @export
 * @interface Store
 */export interface Store {
    name: string;
    address: string;
    country: string;
    lat: number;
    lng: number;
    zoom: number;
    active: boolean;
}
